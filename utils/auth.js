const AuthService = {
    login: async (email, password, userType) => {
        try {
            if (!email || !password) {
                throw new Error('Email e senha são obrigatórios');
            }

            // Validar formato de email
            if (!/\S+@\S+\.\S+/.test(email)) {
                throw new Error('Email inválido');
            }

            let user = null;
            
            // Tentar buscar usuário no Supabase primeiro
            try {
                user = await supabase.getUser(email);
                console.log('Usuário encontrado no Supabase:', user);
            } catch (supabaseError) {
                console.log('Supabase offline, tentando localStorage');
                // Fallback para localStorage
                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                user = users.find(u => u.email === email);
            }
            
            if (!user) {
                throw new Error('Usuário não encontrado. Registre-se primeiro.');
            }

            // Verificar senha
            if (user.password !== password) {
                throw new Error('Senha incorreta');
            }

            // Verificar tipo de usuário
            if (user.type !== userType) {
                throw new Error(`Este usuário não é ${userType === 'admin' ? 'administrador' : 'afiliado'}`);
            }

            // Verificar se usuário está ativo
            if (user.status !== 'active') {
                throw new Error('Usuário bloqueado. Entre em contato com o suporte.');
            }

            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
    },

    getCurrentUser: () => {
        try {
            const userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Erro ao recuperar usuário:', error);
            return null;
        }
    },

    isAuthenticated: () => {
        const user = AuthService.getCurrentUser();
        return user !== null;
    },

    isAdmin: () => {
        const user = AuthService.getCurrentUser();
        return user && user.type === 'admin';
    },

    generateAffiliateLink: (userId) => {
        const baseUrl = 'https://affiglobal.com/ref/';
        const linkCode = btoa(userId).replace(/[^a-zA-Z0-9]/g, '').substr(0, 10);
        return `${baseUrl}${linkCode}`;
    },

    validateSession: () => {
        const user = AuthService.getCurrentUser();
        if (!user) return false;
        
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        // Sessão expira em 24 horas
        if (hoursDiff > 24) {
            AuthService.logout();
            return false;
        }
        
        return true;
    }
};
