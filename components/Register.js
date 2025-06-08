function Register({ onRegister, onBackToLogin }) {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            name: '',
            adminCode: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [showAdminCode, setShowAdminCode] = React.useState(false);

        const ADMIN_SECRET_CODE = 'ADMIN2024#AFFIGLOBAL';

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (!formData.name || !formData.email || !formData.password) {
                alert('Preencha todos os campos obrigatórios!');
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                alert('Senhas não coincidem!');
                return;
            }

            if (showAdminCode && formData.adminCode !== ADMIN_SECRET_CODE) {
                alert('Código admin inválido!');
                return;
            }
            
            setLoading(true);
            try {
                // Verificar se email já existe
                const existingUser = await supabase.getUser(formData.email);
                if (existingUser) {
                    alert('Email já cadastrado! Tente fazer login.');
                    setLoading(false);
                    return;
                }

                const userData = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || '',
                    password: formData.password,
                    type: showAdminCode ? 'admin' : 'affiliate',
                    status: 'active'
                };
                
                // Registrar no Supabase
                await supabase.createUser(userData);
                
                alert(`${showAdminCode ? 'Admin' : 'Afiliado'} registrado com sucesso! Faça login agora.`);
                onBackToLogin();
            } catch (error) {
                console.error('Erro no registro:', error);
                alert('Erro no registro: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
                <div className="dark-card rounded-3xl shadow-2xl p-10 w-full max-w-md glow-effect">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-3 neon-text">Criar Conta</h1>
                        <p className="text-slate-300">AffiGlobal - {showAdminCode ? 'Admin' : 'Afiliado'}</p>
                    </div>

                    <div className="flex mb-6">
                        <button
                            type="button"
                            onClick={() => setShowAdminCode(!showAdminCode)}
                            className="text-sm text-slate-400 hover:text-purple-400 transition-colors"
                        >
                            {showAdminCode ? '← Afiliado' : 'Sou Admin →'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nome completo"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                            required
                        />

                        <input
                            type="tel"
                            placeholder="Telefone (opcional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                        />

                        {showAdminCode && (
                            <input
                                type="password"
                                placeholder="Código Admin Secreto"
                                value={formData.adminCode}
                                onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-2xl border border-red-500/30"
                                required
                            />
                        )}

                        <input
                            type="password"
                            placeholder="Senha (mín. 6 chars)"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary text-white py-3 rounded-2xl font-semibold"
                        >
                            {loading ? 'Registrando...' : `Criar Conta ${showAdminCode ? 'Admin' : ''}`}
                        </button>

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="w-full text-slate-300 hover:text-white py-2 text-sm"
                        >
                            Já tem conta? <span className="text-purple-400">Login</span>
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Register component error:', error);
        reportError(error);
    }
}
