function Header({ user, onLogout, onToggleSidebar, isMobile }) {
    try {
        return (
            <header data-name="header" data-file="components/Header.js" className={`dark-bg border-b border-slate-700 ${isMobile ? 'mobile-header' : 'px-6 py-4'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {isMobile && (
                            <button
                                onClick={onToggleSidebar}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                            >
                                <i className="fas fa-bars text-lg"></i>
                            </button>
                        )}
                        <h1 className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>AffiGlobal</h1>
                        <span className={`px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {user.type === 'admin' ? 'Admin' : 'Afiliado'}
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-3">
                            <div className={`bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                                <i className={`fas fa-user text-white ${isMobile ? 'text-xs' : 'text-sm'}`}></i>
                            </div>
                            {!isMobile && (
                                <span className="text-slate-300 font-medium">{user.name}</span>
                            )}
                        </div>
                        
                        <button
                            onClick={onLogout}
                            className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-700"
                            title="Sair"
                        >
                            <i className={`fas fa-sign-out-alt ${isMobile ? 'text-sm' : ''}`}></i>
                        </button>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
