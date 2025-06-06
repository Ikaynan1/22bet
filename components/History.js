function History() {
    try {
        const [historyData, setHistoryData] = React.useState([]);
        const [filter, setFilter] = React.useState('all');
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            loadHistoryData();
        }, [filter]);

        const loadHistoryData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Carregar dados do localStorage (editados pelo admin)
                const userId = '1'; // ID do usuário atual
                const dailyData = JSON.parse(localStorage.getItem('dailyAffiliateData') || '{}');
                const userDailyData = dailyData[userId] || {};
                
                const history = [];
                for (let i = 0; i < 30; i++) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    const dayData = userDailyData[dateStr] || {
                        totalRegistrations: Math.floor(Math.random() * 10),
                        totalFTDs: Math.floor(Math.random() * 3),
                        totalDeposits: Math.floor(Math.random() * 2000) + 500,
                        totalCommissions: Math.floor(Math.random() * 200) + 50
                    };
                    
                    history.push({
                        id: i + 1,
                        date: date.toLocaleDateString('pt-BR'),
                        registrations: dayData.totalRegistrations,
                        ftds: dayData.totalFTDs,
                        deposits: parseFloat(dayData.totalDeposits),
                        commissions: parseFloat(dayData.totalCommissions),
                        status: Math.random() > 0.7 ? 'pendente' : 'processado'
                    });
                }

                setHistoryData(history);
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
            } finally {
                setLoading(false);
            }
        };

        const getStatusBadge = (status) => {
            const badges = {
                pendente: 'bg-yellow-100 text-yellow-800',
                processado: 'bg-blue-100 text-blue-800',
                pago: 'bg-green-100 text-green-800'
            };
            return badges[status] || 'bg-gray-100 text-gray-800';
        };

        return (
            <div data-name="history" data-file="components/History.js" className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Histórico Detalhado</h1>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todos</option>
                        <option value="registrations">Registros</option>
                        <option value="ftds">FTDs</option>
                        <option value="commissions">Comissões</option>
                        <option value="payments">Pagamentos</option>
                    </select>
                </div>

                <div className="bg-white rounded-lg card-shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Histórico de Performance</h3>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registros</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">FTDs</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Depósitos</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comissões</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {historyData.slice(0, 15).map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.registrations}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ftds}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${item.deposits.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                                ${item.commissions.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('History component error:', error);
        reportError(error);
    }
}
