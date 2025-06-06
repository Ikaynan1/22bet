function Header({ user, onLogout, onToggleSidebar, isMobile }) {
    try {
        return (
            <header data-name="header" data-file="components/Header.js" className={`dark-bg border-b border-slate-700/50 backdrop-filter backdrop-blur-xl ${isMobile ? 'mobile-header' : 'px-8 py-6'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        {isMobile && (
                            <button
                                onClick={onToggleSidebar}
                                className="p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                            >
                                <i className="fas fa-bars text-lg"></i>
                            </button>
                        )}
                        <div className="flex items-center space-x-4">
                            <h1 className={`font-bold text-white neon-text ${isMobile ? 'text-xl' : 'text-3xl'}`}>AffiGlobal</h1>
                            <span className={`px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                <i className={`${user.type === 'admin' ? 'fas fa-crown' : 'fas fa-user'} mr-2`}></i>
                                {user.type === 'admin' ? 'Admin' : 'Afiliado'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <div className={`bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}>
                                <i className={`fas fa-user text-white ${isMobile ? 'text-sm' : 'text-lg'}`}></i>
                            </div>
                            {!isMobile && (
                                <div>
                                    <p className="text-white font-semibold">{user.name}</p>
                                    <p className="text-slate-400 text-sm">Online agora</p>
                                </div>
                            )}
                        </div>
                        
                        <button
                            onClick={onLogout}
                            className="text-slate-400 hover:text-red-400 transition-all duration-300 p-3 rounded-2xl hover:bg-red-500/10"
                            title="Sair"
                        >
                            <i className={`fas fa-sign-out-alt ${isMobile ? 'text-lg' : 'text-xl'}`}></i>
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
