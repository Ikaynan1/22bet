function Dashboard() {
    try {
        const [metrics, setMetrics] = React.useState({
            registrations: 0,
            ftds: 0,
            deposits: 0,
            commissions: 0
        });
        const [dailyHistory, setDailyHistory] = React.useState([]);
        const [period, setPeriod] = React.useState('7');
        const [loading, setLoading] = React.useState(true);
        const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

        React.useEffect(() => {
            loadDashboardData();
            
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [period]);

        const loadDashboardData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const userId = '1';
                const dailyData = JSON.parse(localStorage.getItem('dailyAffiliateData') || '{}');
                const userDailyData = dailyData[userId] || {};
                
                const days = parseInt(period);
                const history = [];
                let totalRegistrations = 0, totalFTDs = 0, totalDeposits = 0, totalCommissions = 0;
                
                for (let i = 0; i < days; i++) {
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
                        date: date.toLocaleDateString('pt-BR'),
                        registrations: dayData.totalRegistrations,
                        ftds: dayData.totalFTDs,
                        deposits: dayData.totalDeposits,
                        commissions: dayData.totalCommissions
                    });
                    
                    totalRegistrations += dayData.totalRegistrations;
                    totalFTDs += dayData.totalFTDs;
                    totalDeposits += parseFloat(dayData.totalDeposits);
                    totalCommissions += parseFloat(dayData.totalCommissions);
                }
                
                setMetrics({
                    registrations: totalRegistrations,
                    ftds: totalFTDs,
                    deposits: totalDeposits,
                    commissions: totalCommissions
                });
                
                setDailyHistory(history.reverse());
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        const MetricCard = ({ title, value, icon, color, prefix = '', suffix = '' }) => (
            <div className="metric-card rounded-2xl p-6 mobile-card">
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-slate-400 font-medium ${isMobile ? 'text-xs mobile-mb-2' : 'text-sm mb-2'}`}>{title}</p>
                        <p className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}>
                            {loading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                `${prefix}${typeof value === 'number' ? value.toLocaleString() : value}${suffix}`
                            )}
                        </p>
                    </div>
                    <div className={`rounded-2xl flex items-center justify-center ${color} ${
                        isMobile ? 'w-12 h-12' : 'w-16 h-16'
                    }`}>
                        <i className={`${icon} text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}></i>
                    </div>
                </div>
            </div>
        );

        return (
            <div data-name="dashboard" data-file="components/Dashboard.js" className={isMobile ? 'mobile-main' : 'p-6'}>
                <div className={`flex items-center justify-between mb-8 ${isMobile ? 'flex-col space-y-4' : ''}`}>
                    <h1 className={`font-bold text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Dashboard</h1>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className={`input-dark rounded-xl focus:ring-2 focus:ring-indigo-500 ${
                            isMobile ? 'w-full text-sm px-3 py-2' : 'px-4 py-3'
                        }`}
                    >
                        <option value="7">Últimos 7 dias</option>
                        <option value="15">Últimos 15 dias</option>
                        <option value="30">Últimos 30 dias</option>
                    </select>
                </div>

                <div className={`grid gap-6 mb-8 ${isMobile ? 'mobile-grid grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                    <MetricCard
                        title="Registros"
                        value={metrics.registrations}
                        icon="fas fa-user-plus"
                        color="bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                    <MetricCard
                        title="FTDs"
                        value={metrics.ftds}
                        icon="fas fa-coins"
                        color="bg-gradient-to-r from-green-500 to-emerald-500"
                    />
                    <MetricCard
                        title="Depósitos"
                        value={metrics.deposits.toFixed(2)}
                        icon="fas fa-dollar-sign"
                        color="bg-gradient-to-r from-purple-500 to-pink-500"
                        prefix="$"
                    />
                    <MetricCard
                        title="Comissões"
                        value={metrics.commissions.toFixed(2)}
                        icon="fas fa-chart-line"
                        color="bg-gradient-to-r from-orange-500 to-red-500"
                        prefix="$"
                    />
                </div>

                <div className="table-dark rounded-2xl mobile-card">
                    <div className={`px-6 py-4 border-b border-slate-700 ${isMobile ? 'mobile-p-2' : ''}`}>
                        <h3 className={`font-semibold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>Histórico Diário</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className={`w-full ${isMobile ? 'mobile-table' : ''}`}>
                            <thead>
                                <tr>
                                    <th className={`text-left text-xs font-medium text-slate-300 uppercase ${
                                        isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                    }`}>Data</th>
                                    <th className={`text-left text-xs font-medium text-slate-300 uppercase ${
                                        isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                    }`}>Reg.</th>
                                    <th className={`text-left text-xs font-medium text-slate-300 uppercase ${
                                        isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                    }`}>FTDs</th>
                                    <th className={`text-left text-xs font-medium text-slate-300 uppercase ${
                                        isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                    }`}>Dep.</th>
                                    <th className={`text-left text-xs font-medium text-slate-300 uppercase ${
                                        isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                    }`}>Com.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyHistory.slice(0, isMobile ? 7 : 15).map((item, index) => (
                                    <tr key={index}>
                                        <td className={`text-sm text-slate-300 ${
                                            isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                        }`}>{isMobile ? item.date.split('/').slice(0,2).join('/') : item.date}</td>
                                        <td className={`text-sm text-slate-300 ${
                                            isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                        }`}>{item.registrations}</td>
                                        <td className={`text-sm text-slate-300 ${
                                            isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                        }`}>{item.ftds}</td>
                                        <td className={`text-sm text-slate-300 ${
                                            isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                        }`}>
                                            ${isMobile ? parseFloat(item.deposits).toFixed(0) : parseFloat(item.deposits).toLocaleString()}
                                        </td>
                                        <td className={`text-sm font-medium text-green-400 ${
                                            isMobile ? 'px-3 py-3' : 'px-6 py-4'
                                        }`}>
                                            ${isMobile ? parseFloat(item.commissions).toFixed(0) : parseFloat(item.commissions).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
    }
}
