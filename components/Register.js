import { supabase } from '../utils/supabase.js';

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
    // Estado para mostrar mensagens de sucesso ou erro ao utilizador
    const [message, setMessage] = React.useState('');

    const ADMIN_SECRET_CODE = 'ADMIN2024#AFFIGLOBAL';

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        
        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem';
        }
        
        // Validação de telefone mais simples
        if (formData.phone.replace(/\D/g, '').length < 10) {
            newErrors.phone = 'Telefone inválido';
        }

        if (showAdminCode && formData.adminCode !== ADMIN_SECRET_CODE) {
            newErrors.adminCode = 'Código de admin inválido';
        }
        
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

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setFormData({...formData, phone: formatted});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Limpa mensagens anteriores
        
        // ===== NOVO PASSO DE VERIFICAÇÃO =====
        // Vamos verificar se o cliente do Supabase foi importado corretamente
        if (!supabase) {
            console.error('Erro de Configuração: O cliente do Supabase não foi carregado. Verifique o ficheiro utils/supabase.js e as variáveis de ambiente no Netlify.');
            setMessage('Erro de Configuração: Não foi possível conectar à base de dados.');
            setLoading(false);
            return;
        }

        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const userData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                // ATENÇÃO: Guardar senhas em texto plano é um grande risco de segurança.
                password: formData.password,
                type: showAdminCode ? 'admin' : 'affiliate',
                status: 'active',
            };
            
            const { error } = await supabase
                .from('users')
                .insert([userData]);
            
            if (error) {
                throw error;
            }
            
            // ===== LÓGICA DE SUCESSO ALTERADA =====
            // Em vez de redirecionar, mostramos uma mensagem clara.
            // O utilizador pode clicar no botão "Fazer login" para voltar.
            setMessage(`${showAdminCode ? 'Admin' : 'Afiliado'} registado com sucesso! Agora pode fazer login.`);
            

        } catch (error) {
            console.error('Erro no registo:', error);
            setMessage(`Erro no registo: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div data-name="register-container" data-file="components/Register.js" className="min-h-screen gradient-bg flex items-center justify-center p-4">
            <div className="dark-card rounded-3xl shadow-2xl p-10 w-full max-w-md glow-effect float-animation">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-3 neon-text">Criar Conta</h1>
                    <p className="text-slate-300 text-lg">AffiGlobal - {showAdminCode ? 'Admin' : 'Afiliado'}</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="flex mb-8">
                    <button
                        type="button"
                        onClick={() => setShowAdminCode(!showAdminCode)}
                        className="text-sm text-slate-400 hover:text-purple-400 transition-colors font-medium"
                    >
                        {showAdminCode ? '← Voltar para Afiliado' : 'Sou Admin →'}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campos do formulário (inputs) permanecem os mesmos... */}
                    <div>
                        <input type="text" placeholder="Nome completo" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all" />
                        {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                    </div>
                    <div>
                        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all" />
                        {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <div>
                        <input type="tel" placeholder="Telefone (11) 99999-9999" value={formData.phone} onChange={handlePhoneChange} maxLength="15" className="w-full px-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all" />
                        {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
                    </div>
                    {showAdminCode && (
                        <div>
                            <input type="password" placeholder="Código Secreto de Admin" value={formData.adminCode} onChange={(e) => setFormData({...formData, adminCode: e.target.value})} className="w-full px-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-red-500 border border-red-500/30" />
                            {errors.adminCode && <p className="text-red-400 text-sm mt-2">{errors.adminCode}</p>}
                        </div>
                    )}
                    <div>
                        <input type="password" placeholder="Senha (mín. 6 caracteres)" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all" />
                        {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
                    </div>
                    <div>
                        <input type="password" placeholder="Confirmar senha" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full px-4 py-4 input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all" />
                        {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" disabled={loading} className={`w-full text-white py-4 rounded-2xl font-semibold text-lg transition-all disabled:opacity-50 pulse-glow ${ showAdminCode ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : 'btn-primary' }`}>
                        {loading ? (<div className="flex items-center justify-center"><div className="loading-spinner mr-3"></div>A criar conta...</div>) : (`Criar Conta ${showAdminCode ? 'Admin' : 'Afiliado'}`)}
                    </button>
                    <button type="button" onClick={onBackToLogin} className="w-full text-slate-300 hover:text-white py-3 text-sm transition-colors hover:bg-slate-700/20 rounded-2xl">
                        Já tem conta? <span className="text-purple-400 font-semibold">Fazer login</span>
                    </button>
                </form>

                {/* ===== ÁREA PARA MOSTRAR MENSAGENS DE SUCESSO/ERRO ===== */}
                {message && (
                    <div className={`mt-6 p-4 rounded-xl text-center text-white font-medium ${message.includes('Erro') ? 'bg-red-900/50 border border-red-700' : 'bg-green-900/50 border border-green-700'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
