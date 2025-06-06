function Sidebar({ userType, activeTab, onTabChange, isMobile, isOpen, onClose }) {
    try {
        const affiliateMenuItems = [
            { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
            { id: 'mylink', label: 'Meu Link', icon: 'fas fa-link' },
            { id: 'commissions', label: 'Comissões', icon: 'fas fa-dollar-sign' },
            { id: 'wallet', label: 'Carteira', icon: 'fas fa-wallet' },
            { id: 'history', label: 'Histórico', icon: 'fas fa-history' }
        ];

        const adminMenuItems = [
            { id: 'admin-dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
            { id: 'admin-affiliates', label: 'Afiliados', icon: 'fas fa-users' },
            { id: 'admin-daily-edit', label: 'Edição Diária', icon: 'fas fa-edit' },
            { id: 'admin-payments', label: 'Pagamentos', icon: 'fas fa-credit-card' },
            { id: 'admin-settings', label: 'Configurações', icon: 'fas fa-cog' }
        ];

        const menuItems = userType === 'admin' ? adminMenuItems : affiliateMenuItems;

        const handleTabChange = (tabId) => {
            onTabChange(tabId);
            if (isMobile) {
                onClose();
            }
        };

        return (
            <React.Fragment>
                {isMobile && isOpen && (
                    <div className="mobile-overlay" onClick={onClose}></div>
                )}
                
                <aside 
                    data-name="sidebar" 
                    data-file="components/Sidebar.js" 
                    className={`gradient-bg text-white h-screen backdrop-filter backdrop-blur-xl ${
                        isMobile 
                            ? `mobile-sidebar ${isOpen ? 'open' : ''}` 
                            : 'w-80'
                    }`}
                >
                    <div className="p-8">
                        {isMobile && (
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold neon-text">Menu</h2>
                                <button onClick={onClose} className="text-white hover:text-red-400 transition-colors p-2">
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                        )}
                        
                        <div className="text-center mb-10">
                            <div className={`bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl glow-effect ${
                                isMobile ? 'w-16 h-16' : 'w-20 h-20'
                            }`}>
                                <i className={`fas fa-chart-bar text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}></i>
                            </div>
                            <h2 className={`font-bold text-white neon-text ${isMobile ? 'text-lg' : 'text-xl'}`}>
                                {userType === 'admin' ? 'Painel Admin' : 'Painel Afiliado'}
                            </h2>
                            <p className="text-slate-400 text-sm mt-2">Sistema de Gestão</p>
                        </div>

                        <nav>
                            <ul className="space-y-3">
                                {menuItems.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleTabChange(item.id)}
                                            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl sidebar-item transition-all duration-300 ${
                                                activeTab === item.id ? 'active' : ''
                                            } ${isMobile ? 'text-sm' : 'text-base'}`}
                                        >
                                            <i className={`${item.icon} text-lg`}></i>
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>
            </React.Fragment>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
    }
}
