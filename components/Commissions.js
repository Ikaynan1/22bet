function Commissions() {
    try {
        const [commissions, setCommissions] = React.useState({
            total: 0,
            pending: 0,
            paid: 0
        });
        const [history, setHistory] = React.useState([]);
        const [filter, setFilter] = React.useState('week');
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            loadCommissionData();
        }, [filter]);

        const loadCommissionData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                
                const mockCommissions = {
                    total: Math.floor(Math.random() * 10000) + 5000,
                    pending: Math.floor(Math.random() * 2000) + 500,
                    paid: Math.floor(Math.random() * 8000) + 4000
                };

                const mockHistory = Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                    ftds: Math.floor(Math.random() * 5) + 1,
                    deposits: Math.floor(Math.random() * 5000) + 1000,
                    commission: Math.floor(Math.random() * 500) + 100
                }));

                setCommissions(mockCommissions);
                setHistory(mockHistory);
            } catch (error) {
                console.error('Erro ao carregar comissões:', error);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div data-name="commissions" data-file="components/Commissions.js" className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Minhas Comissões</h1>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="day">Hoje</option>
                        <option value="week">Esta semana</option>
                        <option value="month">Este mês</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Recebido</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">
                                    ${loading ? '...' : commissions.paid.toLocaleString()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-check-circle text-green-600 text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Pendente</p>
                                <p className="text-2xl font-bold text-orange-600 mt-1">
                                    ${loading ? '...' : commissions.pending.toLocaleString()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-clock text-orange-600 text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Acumulado</p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">
                                    ${loading ? '...' : commissions.total.toLocaleString()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-chart-line text-blue-600 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg card-shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Histórico de Comissões</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">FTDs</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Depósitos</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comissão</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {history.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ftds}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.deposits.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${item.commission.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Commissions component error:', error);
        reportError(error);
    }
}
