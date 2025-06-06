const DataService = {
    getDashboardMetrics: async (period = '7') => {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const multiplier = period === '30' ? 3 : period === '15' ? 2 : 1;
            
            return {
                registrations: Math.floor(Math.random() * 50 * multiplier) + 20,
                ftds: Math.floor(Math.random() * 15 * multiplier) + 5,
                deposits: Math.floor(Math.random() * 25000 * multiplier) + 5000,
                commissions: Math.floor(Math.random() * 2500 * multiplier) + 500
            };
        } catch (error) {
            throw new Error('Erro ao carregar métricas');
        }
    },

    getCommissionHistory: async (filter = 'week') => {
        try {
            await new Promise(resolve => setTimeout(resolve, 600));
            
            const days = filter === 'month' ? 30 : filter === 'week' ? 7 : 1;
            
            return Array.from({ length: days }, (_, i) => ({
                id: i + 1,
                date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                ftds: Math.floor(Math.random() * 5) + 1,
                deposits: Math.floor(Math.random() * 5000) + 1000,
                commission: Math.floor(Math.random() * 500) + 100
            }));
        } catch (error) {
            throw new Error('Erro ao carregar histórico');
        }
    },

    getAffiliateStats: async (affiliateId) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            return {
                totalClicks: Math.floor(Math.random() * 1000) + 200,
                conversionRate: (Math.random() * 5 + 10).toFixed(2),
                totalEarnings: Math.floor(Math.random() * 10000) + 2000,
                pendingPayments: Math.floor(Math.random() * 2000) + 300
            };
        } catch (error) {
            throw new Error('Erro ao carregar estatísticas');
        }
    },

    saveWalletAddress: async (address) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            localStorage.setItem('walletAddress', address);
            return { success: true };
        } catch (error) {
            throw new Error('Erro ao salvar carteira');
        }
    },

    getAdminMetrics: async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 900));
            
            return {
                totalAffiliates: Math.floor(Math.random() * 100) + 50,
                totalRegistrations: Math.floor(Math.random() * 2000) + 1000,
                totalFTDs: Math.floor(Math.random() * 300) + 150,
                totalCommissions: Math.floor(Math.random() * 75000) + 25000,
                monthlyGrowth: (Math.random() * 20 + 5).toFixed(1)
            };
        } catch (error) {
            throw new Error('Erro ao carregar métricas admin');
        }
    },

    exportPaymentReport: async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const csvData = 'Afiliado,Valor,Data,Status\n' +
                'Afiliado 1,$1500,2024-01-15,Pago\n' +
                'Afiliado 2,$800,2024-01-14,Pendente\n';
            
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio-pagamentos.csv';
            a.click();
            
            window.URL.revokeObjectURL(url);
            return { success: true };
        } catch (error) {
            throw new Error('Erro ao exportar relatório');
        }
    }
};
