function Register({ onRegister, onBackToLogin }) {
    // --- INÍCIO DA CORREÇÃO DEFINITIVA ---
    // Como o seu projeto não usa um sistema de "build", o `import` de outros ficheiros não funciona.
    // Para resolver isto, criamos a conexão com o Supabase diretamente aqui.
    // O objeto 'supabase' global vem da biblioteca que o seu site carrega no HTML.

    // ** SUBSTITUA OS VALORES ABAIXO PELOS SEUS DADOS PÚBLICOS **
    const SUPABASE_URL = 'https://ibqteopvwazfvxqlvzcc.supabase.co'; // Este é o seu URL correto.
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicXRlb3B2d2F6ZnZ4cWx2emNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5ODgyNjQsImV4cCI6MjA2NDU2NDI2NH0.b-8w_uEcGA-l0KBS78v-ZcYGXA52ErguPvLXk_HJJtQ'; // COLE A SUA CHAVE "ANON" "PUBLIC" AQUI

    // Verificamos se a biblioteca do Supabase foi carregada e criamos o cliente
    const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
    // --- FIM DA CORREÇÃO DEFINITIVA ---

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
        
        if (!supabaseClient) {
            alert("Erro de configuração: A conexão com o Supabase não pôde ser estabelecida.");
            return;
        }

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
            
            // Usamos o supabaseClient que foi criado no início desta função
            const { error: supabaseError } = await supabaseClient.from('users').insert([userData]);

            if (supabaseError) {
                throw supabaseError; // Lança o erro para ser apanhado pelo bloco catch
            }
            
            alert(`${showAdminCode ? 'Admin' : 'Afiliado'} registrado com sucesso!`);
            onBackToLogin();

        } catch (error) {
            // Este catch agora apanha erros do Supabase e outros erros inesperados
            console.error('Erro geral no registro:', error);
            alert(`Erro no registro: ${error.message}`);
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