const AuthService = {
    login: async (username, password, userType) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const userData = {
                id: Math.random().toString(36).substr(2, 9),
                username,
                type: userType,
                name: userType === 'admin' ? 'Admin User' : `Afiliado ${username}`,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw new Error('Erro no login');
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
