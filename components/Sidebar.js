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
                    className={`gradient-bg text-white h-screen ${
                        isMobile 
                            ? `mobile-sidebar ${isOpen ? 'open' : ''}` 
                            : 'w-64'
                    }`}
                >
                    <div className="p-6">
                        {isMobile && (
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">Menu</h2>
                                <button onClick={onClose} className="text-white">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        )}
                        
                        <div className="text-center mb-8">
                            <div className={`bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 ${
                                isMobile ? 'w-12 h-12' : 'w-16 h-16'
                            }`}>
                                <i className={`fas fa-chart-bar ${isMobile ? 'text-xl' : 'text-2xl'}`}></i>
                            </div>
                            <h2 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
                                {userType === 'admin' ? 'Painel Admin' : 'Painel Afiliado'}
                            </h2>
                        </div>

                        <nav>
                            <ul className="space-y-2">
                                {menuItems.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleTabChange(item.id)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg sidebar-item ${
                                                activeTab === item.id ? 'active' : ''
                                            } ${isMobile ? 'text-sm' : ''}`}
                                        >
                                            <i className={item.icon}></i>
                                            <span>{item.label}</span>
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
