function AdminDashboard() {
    try {
        const [metrics, setMetrics] = React.useState({
            totalAffiliates: 0,
            totalRegistrations: 0,
            totalFTDs: 0,
            totalCommissions: 0
        });
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            loadAdminData();
        }, []);

        const loadAdminData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockMetrics = {
                    totalAffiliates: Math.floor(Math.random() * 100) + 50,
                    totalRegistrations: Math.floor(Math.random() * 1000) + 500,
                    totalFTDs: Math.floor(Math.random() * 200) + 100,
                    totalCommissions: Math.floor(Math.random() * 50000) + 25000
                };
                
                setMetrics(mockMetrics);
            } catch (error) {
                console.error('Erro ao carregar dados admin:', error);
            } finally {
                setLoading(false);
            }
        };

        const MetricCard = ({ title, value, icon, color, prefix = '', suffix = '' }) => (
            <div className="bg-white rounded-lg p-6 card-shadow metric-card">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">{title}</p>
                        <p className={`text-2xl font-bold ${color} mt-1`}>
                            {loading ? '...' : `${prefix}${value.toLocaleString()}${suffix}`}
                        </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <i className={`${icon} ${color} text-xl`}></i>
                    </div>
                </div>
            </div>
        );

        return (
            <div data-name="admin-dashboard" data-file="components/AdminDashboard.js" className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="Total de Afiliados"
                        value={metrics.totalAffiliates}
                        icon="fas fa-users"
                        color="text-blue-600"
                    />
                    <MetricCard
                        title="Total de Registros"
                        value={metrics.totalRegistrations}
                        icon="fas fa-user-plus"
                        color="text-green-600"
                    />
                    <MetricCard
                        title="Total de FTDs"
                        value={metrics.totalFTDs}
                        icon="fas fa-coins"
                        color="text-purple-600"
                    />
                    <MetricCard
                        title="Comissões Totais"
                        value={metrics.totalCommissions}
                        icon="fas fa-chart-line"
                        color="text-orange-600"
                        prefix="$"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Geral</h3>
                        <div className="chart-container flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <i className="fas fa-chart-pie text-4xl mb-2"></i>
                                <p>Gráfico de performance em desenvolvimento</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Afiliados</h3>
                        <div className="space-y-4">
                            {Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">{i + 1}</span>
                                        </div>
                                        <span className="font-medium">Afiliado {i + 1}</span>
                                    </div>
                                    <span className="text-green-600 font-semibold">
                                        ${(Math.random() * 5000 + 1000).toFixed(0)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminDashboard component error:', error);
        reportError(error);
    }
}
