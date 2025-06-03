function Register({ onRegister, onBackToLogin }) {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            name: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [errors, setErrors] = React.useState({});

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
            
            if (!formData.phone.trim()) {
                newErrors.phone = 'Telefone é obrigatório';
            } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
                newErrors.phone = 'Formato: (11) 99999-9999';
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
            
            if (!validateForm()) return;
            
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const userData = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    type: 'affiliate',
                    registeredAt: new Date().toISOString()
                };
                
                // Salvar no localStorage
                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                users.push(userData);
                localStorage.setItem('registeredUsers', JSON.stringify(users));
                
                alert('Registro realizado com sucesso! Faça login agora.');
                onBackToLogin();
            } catch (error) {
                alert('Erro no registro. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div data-name="register-container" data-file="components/Register.js" className="min-h-screen gradient-bg flex items-center justify-center p-4">
                <div className="dark-card rounded-2xl shadow-2xl p-8 w-full max-w-md glow-effect">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-white mb-2">Criar Conta</h1>
                        <p className="text-slate-300">AffiGlobal - Torne-se um Afiliado</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Nome completo"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <input
                                type="tel"
                                placeholder="Telefone (11) 99999-9999"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                maxLength="15"
                                className="w-full px-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Senha (mín. 6 caracteres)"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Confirmar senha"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="w-full px-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 mb-4"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="loading-spinner mr-2"></div>
                                    Criando conta...
                                </div>
                            ) : (
                                'Criar Conta'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="w-full text-slate-300 hover:text-white py-2 text-sm transition-colors"
                        >
                            Já tem conta? Fazer login
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
