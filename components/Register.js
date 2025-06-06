function Register({ onRegister, onBackToLogin }) {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        name: '',
        adminCode: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [showAdminCode, setShowAdminCode] = React.useState(false);

    const ADMIN_SECRET_CODE = 'ADMIN2024#AFFIGLOBAL';

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
        if (!formData.password) newErrors.password = 'Senha é obrigatória';
        else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Senhas não coincidem';
        if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
        if (showAdminCode && formData.adminCode !== ADMIN_SECRET_CODE) newErrors.adminCode = 'Código inválido';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatPhone = (value) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 2) return `(${numbers}`;
        if (numbers.length <= 6) return `(${numbers.slice(0,2)}) ${numbers.slice(2)}`;
        if (numbers.length <= 10) return `(${numbers.slice(0,2)}) ${numbers.slice(2,6)}-${numbers.slice(6)}`;
        return `(${numbers.slice(0,2)}) ${numbers.slice(2,7)}-${numbers.slice(7,11)}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const userData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                type: showAdminCode ? 'admin' : 'affiliate',
                status: 'active'
            };
            
            // Tentar Supabase primeiro, com a função CORRETA
            const { error: supabaseError } = await supabase.from('users').insert([userData]);

            if (supabaseError) {
                // Se o Supabase falhar, usamos o fallback para localStorage
                console.log('Supabase offline ou com erro, usando localStorage como fallback.', supabaseError);
                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                users.push({...userData, id: Date.now().toString()});
                localStorage.setItem('registeredUsers', JSON.stringify(users));
            }
            
            alert(`${showAdminCode ? 'Admin' : 'Afiliado'} registrado com sucesso!`);
            onBackToLogin();

        } catch (error) {
            // Este catch agora apanha outros erros inesperados no processo
            console.error('Erro geral no registro:', error);
            alert('Erro no registro. Tente novamente.');
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
                    />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

                    <input
                        type="tel"
                        placeholder="Telefone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: formatPhone(e.target.value)})}
                        className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                    />

                    {showAdminCode && (
                        <div>
                            <input
                                type="password"
                                placeholder="Código Admin"
                                value={formData.adminCode}
                                onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-2xl border border-red-500/30"
                            />
                            <p className="text-xs text-slate-400 mt-1">Código: ADMIN2024#AFFIGLOBAL</p>
                        </div>
                    )}

                    <input
                        type="password"
                        placeholder="Senha (mín. 6 chars)"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary text-white py-3 rounded-2xl font-semibold"
                    >
                        {loading ? 'Criando...' : `Criar Conta ${showAdminCode ? 'Admin' : ''}`}
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
}