function Login({ onLogin }) {
    try {
        const [loginType, setLoginType] = React.useState('affiliate');
        const [credentials, setCredentials] = React.useState({ username: '', password: '' });
        const [loading, setLoading] = React.useState(false);
        const [showRegister, setShowRegister] = React.useState(false);

        const handleLogin = async (e) => {
            e.preventDefault();
            setLoading(true);
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const userData = {
                    id: '1',
                    username: credentials.username,
                    type: loginType,
                    name: loginType === 'admin' ? 'Admin User' : 'Afiliado Demo'
                };
                
                onLogin(userData);
            } catch (error) {
                alert('Erro no login. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        if (showRegister) {
            return React.createElement(Register, {
                onRegister: onLogin,
                onBackToLogin: () => setShowRegister(false)
            });
        }

        return (
            <div data-name="login-container" data-file="components/Login.js" className="min-h-screen gradient-bg flex items-center justify-center p-4">
                <div className="dark-card rounded-2xl shadow-2xl p-8 w-full max-w-md glow-effect">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">AffiGlobal</h1>
                        <p className="text-slate-300">Painel de Afiliados iGaming</p>
                    </div>

                    <div className="flex mb-6 dark-bg rounded-xl p-1">
                        <button
                            onClick={() => setLoginType('affiliate')}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                                loginType === 'affiliate' 
                                    ? 'btn-primary text-white shadow-lg' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Afiliado
                        </button>
                        <button
                            onClick={() => setLoginType('admin')}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                                loginType === 'admin' 
                                    ? 'btn-primary text-white shadow-lg' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Usuário"
                                value={credentials.username}
                                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Senha"
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 mb-4"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="loading-spinner mr-2"></div>
                                    Entrando...
                                </div>
                            ) : (
                                'Entrar'
                            )}
                        </button>

                        {loginType === 'affiliate' && (
                            <button
                                type="button"
                                onClick={() => setShowRegister(true)}
                                className="w-full text-slate-300 hover:text-white py-2 text-sm transition-colors"
                            >
                                Não tem conta? Registre-se
                            </button>
                        )}
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Login component error:', error);
        reportError(error);
    }
}
