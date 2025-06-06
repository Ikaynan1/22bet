// Configuração do Supabase
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui';

class SupabaseClient {
    constructor() {
        this.url = SUPABASE_URL;
        this.key = SUPABASE_ANON_KEY;
        this.headers = {
            'Content-Type': 'application/json',
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`
        };
    }

    async query(table, method = 'GET', data = null, filters = '') {
        try {
            const url = `${this.url}/rest/v1/${table}${filters}`;
            const options = {
                method,
                headers: this.headers
            };

            if (data && (method === 'POST' || method === 'PATCH')) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`Supabase error: ${response.status}`);
            }

            return method === 'DELETE' ? null : await response.json();
        } catch (error) {
            console.error('Supabase query error:', error);
            throw error;
        }
    }

    // Métodos para usuários
    async createUser(userData) {
        return await this.query('users', 'POST', userData);
    }

    async getUser(email) {
        return await this.query('users', 'GET', null, `?email=eq.${email}&select=*`);
    }

    async updateUser(id, userData) {
        return await this.query('users', 'PATCH', userData, `?id=eq.${id}`);
    }

    // Métodos para métricas
    async saveMetrics(affiliateId, metrics) {
        const data = {
            affiliate_id: affiliateId,
            date: new Date().toISOString().split('T')[0],
            registrations: metrics.registrations,
            ftds: metrics.ftds,
            deposits: metrics.deposits,
            commissions: metrics.commissions,
            updated_at: new Date().toISOString()
        };
        return await this.query('affiliate_metrics', 'POST', data);
    }

    async getMetrics(affiliateId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const filters = `?affiliate_id=eq.${affiliateId}&date=gte.${startDate.toISOString().split('T')[0]}&order=date.desc`;
        return await this.query('affiliate_metrics', 'GET', null, filters);
    }

    // Métodos para pagamentos
    async createPaymentRequest(affiliateId, amount, wallet) {
        const data = {
            affiliate_id: affiliateId,
            amount: amount,
            wallet_address: wallet,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        return await this.query('payment_requests', 'POST', data);
    }

    async getPaymentRequests(status = null) {
        const filters = status ? `?status=eq.${status}&order=created_at.desc` : '?order=created_at.desc';
        return await this.query('payment_requests', 'GET', null, filters);
    }
}

const supabase = new SupabaseClient();
