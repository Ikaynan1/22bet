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
            <div className="metric-card rounded-3xl p-8 mobile-card">
                <div className="flex items-center justify-between">
                    <div>
                        <p className={`text-slate-400 font-medium ${isMobile ? 'text-xs mobile-mb-2' : 'text-sm mb-3'}`}>{title}</p>
                        <p className={`font-bold text-white ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                            {loading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                `${prefix}${typeof value === 'number' ? value.toLocaleString() : value}${suffix}`
                            )}
                        </p>
                    </div>
                    <div className={`rounded-3xl flex items-center justify-center ${color} ${
                        isMobile ? 'w-16 h-16' : 'w-20 h-20'
                    } shadow-lg`}>
                        <i className={`${icon} text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}></i>
                    </div>
                </div>
            </div>
        );

        return (
            <div data-name="dashboard" data-file="components/Dashboard.js" className={isMobile ? 'mobile-main' : 'p-8'}>
                <div className={`flex items-center justify-between mb-10 ${isMobile ? 'flex-col space-y-6' : ''}`}>
                    <div>
                        <h1 className={`font-bold text-white neon-text ${isMobile ? 'text-3xl' : 'text-5xl'}`}>Dashboard</h1>
                        <p className="text-slate-400 mt-2">Bem-vindo ao seu painel de controle</p>
                    </div>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className={`input-dark rounded-2xl focus:ring-2 focus:ring-purple-500 ${
                            isMobile ? 'w-full text-sm px-4 py-3' : 'px-6 py-4'
                        }`}
                    >
                        <option value="7">Últimos 7 dias</option>
                        <option value="15">Últimos 15 dias</option>
                        <option value="30">Últimos 30 dias</option>
                    </select>
                </div>

                <div className={`grid gap-8 mb-10 ${isMobile ? 'mobile-grid grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                    <MetricCard
                        title="Registros"
                        value={metrics.registrations}
                        icon="fas fa-user-plus"
                        color="bg-gradient-to-br from-blue-500 to-cyan-400"
                    />
                    <MetricCard
                        title="FTDs"
                        value={metrics.ftds}
                        icon="fas fa-coins"
                        color="bg-gradient-to-br from-green-500 to-emerald-400"
                    />
                    <MetricCard
                        title="Depósitos"
                        value={metrics.deposits.toFixed(2)}
                        icon="fas fa-dollar-sign"
                        color="bg-gradient-to-br from-purple-500 to-pink-400"
                        prefix="$"
                    />
                    <MetricCard
                        title="Comissões"
                        value={metrics.commissions.toFixed(2)}
                        icon="fas fa-chart-line"
                        color="bg-gradient-to-br from-orange-500 to-red-400"
                        prefix="$"
                    />
                </div>

                <div className="table-dark rounded-3xl mobile-card overflow-hidden">
                    <div className={`px-8 py-6 border-b border-slate-700/50 ${isMobile ? 'mobile-p-2' : ''}`}>
                        <h3 className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                            <i className="fas fa-chart-area mr-3 text-purple-400"></i>
                            Histórico Diário
                        </h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className={`w-full ${isMobile ? 'mobile-table' : ''}`}>
                            <thead>
                                <tr>
                                    <th className={`text-left text-xs font-semibold text-slate-300 uppercase tracking-wider ${
                                        isMobile ? 'px-4 py-4' : 'px-8 py-6'
                                    }`}>Data</th>
                                    <th className={`text-left text-xs font-semibold text-slate-300 uppercase tracking-wider ${
                                        isMobile ? 'px-4 py-4' : 'px-8 py-6'
                                    }`}>Reg.</th>
                                    <th className={`text-left text-xs font-semibold text-slate-300 uppercase tracking-wider ${
                                        isMobile ? 'px-4 py-4' : 'px-8 py-6'
                                    }`}>FTDs</th>
                                    <th className={`text-left text-xs font-semibold text-slate-300 uppercase tracking-wider ${
                                        isMobile ? 'px-4 py-4' : 'px-8 py-6'
                                    }`}>Dep.</th>
                                    <th className={`text-left text-xs font-semibold text-slate-300 uppercase tracking-wider ${
                                        isMobile ? 'px-4 py-4' : 'px-8 py-6'
                                    }`}>Com.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyHistory.slice(0, isMobile ? 7 : 15).map((item, index) => (
                                    <tr key={index} className="transition-all duration-300">
                                        <td className={`text-sm text-slate-300 font-medium ${
                                            isMobile ? 'px-4 py-4' : 'px-8 py-5'
                                        }`}>{isMobile ? item.date.split('/').slice(0,2).join('/') : item.date}</td>
                                        <td className={`text-sm text-slate-300 ${
                                            isMobile ? 'px-4 py-4' : 'px-8 py-5'
                                        }`}>{item.registrations}</td>
                                        <td className={`text-sm text-slate-300 ${
                                            isMobile ? 'px-4 py-4' : 'px-8 py-5'
                                        }`}>{item.ftds}</td>
                                        <td className={`text-sm text-slate-300 ${
                                            isMobile ? 'px-4 py-4' : 'px-8 py-5'
                                        }`}>
                                            ${isMobile ? parseFloat(item.deposits).toFixed(0) : parseFloat(item.deposits).toLocaleString()}
                                        </td>
                                        <td className={`text-sm font-semibold text-green-400 ${
                                            isMobile ? 'px-4 py-4' : 'px-8 py-5'
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
