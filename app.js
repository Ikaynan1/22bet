function App() {
    try {
        const [user, setUser] = React.useState(null);
        const [activeTab, setActiveTab] = React.useState('dashboard');
        const [loading, setLoading] = React.useState(true);
        const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
        const [sidebarOpen, setSidebarOpen] = React.useState(false);

        React.useEffect(() => {
            checkAuthStatus();
            
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
                if (window.innerWidth > 768) {
                    setSidebarOpen(false);
                }
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        const checkAuthStatus = () => {
            const currentUser = AuthService.getCurrentUser();
            if (currentUser && AuthService.validateSession()) {
                setUser(currentUser);
                setActiveTab(currentUser.type === 'admin' ? 'admin-dashboard' : 'dashboard');
            }
            setLoading(false);
        };

        const handleLogin = (userData) => {
            setUser(userData);
            setActiveTab(userData.type === 'admin' ? 'admin-dashboard' : 'dashboard');
        };

        const handleLogout = () => {
            AuthService.logout();
            setUser(null);
            setActiveTab('dashboard');
        };

        const toggleSidebar = () => {
            setSidebarOpen(!sidebarOpen);
        };

        const closeSidebar = () => {
            setSidebarOpen(false);
        };

        const renderContent = () => {
            if (user?.type === 'admin') {
                switch (activeTab) {
                    case 'admin-dashboard': return React.createElement(AdminDashboard);
                    case 'admin-affiliates': return React.createElement(AdminAffiliates);
                    case 'admin-daily-edit': return React.createElement(AdminDailyEdit);
                    case 'admin-payments': return React.createElement(AdminPayments);
                    case 'admin-settings': return React.createElement(AdminSettings);
                    default: return React.createElement(AdminDashboard);
                }
            } else {
                switch (activeTab) {
                    case 'dashboard': return React.createElement(Dashboard);
                    case 'mylink': return React.createElement(MyLink);
                    case 'commissions': return React.createElement(Commissions);
                    case 'wallet': return React.createElement(Wallet);
                    case 'history': return React.createElement(History);
                    default: return React.createElement(Dashboard);
                }
            }
        };

        if (loading) {
            return (
                <div className="min-h-screen dark-bg flex items-center justify-center">
                    <div className="loading-spinner"></div>
                </div>
            );
        }

        if (!user) {
            return React.createElement(Login, { onLogin: handleLogin });
        }

        return (
            <div data-name="app" data-file="app.js" className="min-h-screen dark-bg">
                <div className={`flex ${isMobile ? 'flex-col' : ''}`}>
                    {React.createElement(Sidebar, {
                        userType: user.type,
                        activeTab,
                        onTabChange: setActiveTab,
                        isMobile,
                        isOpen: sidebarOpen,
                        onClose: closeSidebar
                    })}
                    
                    <div className={`flex-1 ${isMobile ? 'mobile-content' : ''}`}>
                        {React.createElement(Header, {
                            user,
                            onLogout: handleLogout,
                            onToggleSidebar: toggleSidebar,
                            isMobile
                        })}
                        
                        <main className="dark-bg min-h-screen">
                            {renderContent()}
                        </main>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
