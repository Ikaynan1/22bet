function Login({ onLogin }) {
    try {
        const [loginType, setLoginType] = React.useState('affiliate');
        const [credentials, setCredentials] = React.useState({ username: '', password: '' });
        const [loading, setLoading] = React.useState(false);
        const [showRegister, setShowRegister] = React.useState(false);

        const handleLogin = async (e) => {
            e.preventDefault();
            
            if (!credentials.username || !credentials.password) {
                alert('Preencha email e senha!');
                return;
            }
            
            setLoading(true);
            
            try {
                const userData = await AuthService.login(
                    credentials.username, 
                    credentials.password, 
                    loginType
                );
                
                onLogin(userData);
            } catch (error) {
                alert(error.message || 'Login inválido. Verifique suas credenciais.');
            } finally {
                setLoading(false);
            }
        };

        // Renderizar tela de registro
        if (showRegister) {
            return (
                <Register 
                    onRegister={onLogin}
                    onBackToLogin={() => setShowRegister(false)}
                />
            );
        }

        return (
            <div data-name="login-container" data-file="components/Login.js" className="min-h-screen gradient-bg flex items-center justify-center p-4">
                <div className="dark-card rounded-3xl shadow-2xl p-10 w-full max-w-md glow-effect float-animation">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-white mb-3 neon-text">AffiGlobal</h1>
                        <p className="text-slate-300 text-lg">Painel de Afiliados iGaming</p>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="flex mb-8 dark-bg rounded-2xl p-2">
                        <button
                            onClick={() => setLoginType('affiliate')}
                            className={`flex-1 py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                loginType === 'affiliate' 
                                    ? 'btn-primary text-white shadow-lg transform scale-105' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            <i className="fas fa-user mr-2"></i>
                            Afiliado
                        </button>
                        <button
                            onClick={() => setLoginType('admin')}
                            className={`flex-1 py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                loginType === 'admin' 
                                    ? 'btn-primary text-white shadow-lg transform scale-105' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            <i className="fas fa-crown mr-2"></i>
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                value={credentials.username}
                                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all"
                                required
                            />
                        </div>
                        <div className="relative">
                            <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                            <input
                                type="password"
                                placeholder="Senha"
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary text-white py-4 rounded-2xl font-semibold text-lg transition-all disabled:opacity-50 pulse-glow"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="loading-spinner mr-3"></div>
                                    Verificando...
                                </div>
                            ) : (
                                <React.Fragment>
                                    <i className="fas fa-sign-in-alt mr-2"></i>
                                    Entrar
                                </React.Fragment>
                            )}
                        </button>

                        {loginType === 'affiliate' && (
                            <button
                                type="button"
                                onClick={() => setShowRegister(true)}
                                className="w-full text-slate-300 hover:text-white py-3 text-sm transition-colors hover:bg-slate-700/30 rounded-xl"
                            >
                                Não tem conta? <span className="text-purple-400 font-semibold">Registre-se</span>
                            </button>
                        )}
                    </form>

                    <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <p className="text-xs text-slate-400 text-center">
                            <i className="fas fa-info-circle mr-1"></i>
                            Use credenciais reais cadastradas no sistema
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Login component error:', error);
        reportError(error);
    }
}
