const AuthService = {
    login: async (email, password, userType) => {
        try {
            // Tentar buscar usuário no Supabase
            let user = null;
            try {
                user = await supabase.getUser(email);
            } catch (supabaseError) {
                console.log('Supabase offline, tentando localStorage');
                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                user = users.find(u => u.email === email);
            }
            
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            // Verificar senha
            if (user.password !== password) {
                throw new Error('Senha incorreta');
            }

            // Verificar tipo de usuário
            if (user.type !== userType) {
                throw new Error('Tipo de usuário incorreto');
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
            throw new Error('Erro no login: ' + error.message);
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
        
        if (hoursDiff > 24) {
            AuthService.logout();
            return false;
        }
        
        return true;
    }
};
