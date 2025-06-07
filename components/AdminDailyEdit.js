function AdminDailyEdit() {
    try {
        const [selectedAffiliate, setSelectedAffiliate] = React.useState('');
        const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
        const [dailyData, setDailyData] = React.useState({
            totalRegistrations: '0',
            totalFTDs: '0',
            totalDeposits: '0',
            totalCommissions: '0'
        });
        const [affiliates] = React.useState([
            { id: '1', name: 'Afiliado 1' },
            { id: '2', name: 'Afiliado 2' },
            { id: '3', name: 'Afiliado 3' }
        ]);

        React.useEffect(() => {
            if (selectedAffiliate && selectedDate) {
                loadDailyData();
            }
        }, [selectedAffiliate, selectedDate]);

        const loadDailyData = () => {
            const storedData = JSON.parse(localStorage.getItem('dailyAffiliateData') || '{}');
            const affiliateData = storedData[selectedAffiliate] || {};
            const dayData = affiliateData[selectedDate] || {
                totalRegistrations: 0,
                totalFTDs: 0,
                totalDeposits: 0,
                totalCommissions: 0
            };
            
            setDailyData({
                totalRegistrations: dayData.totalRegistrations.toString(),
                totalFTDs: dayData.totalFTDs.toString(),
                totalDeposits: dayData.totalDeposits.toString(),
                totalCommissions: dayData.totalCommissions.toString()
            });
        };

        const handleInputChange = (field, value) => {
            setDailyData(prev => ({
                ...prev,
                [field]: value
            }));
        };

        const saveDailyData = () => {
            if (!selectedAffiliate || !selectedDate) {
                alert('Selecione um afiliado e uma data');
                return;
            }

            const numericData = {
                totalRegistrations: parseInt(dailyData.totalRegistrations) || 0,
                totalFTDs: parseInt(dailyData.totalFTDs) || 0,
                totalDeposits: parseFloat(dailyData.totalDeposits) || 0,
                totalCommissions: parseFloat(dailyData.totalCommissions) || 0
            };

            const storedData = JSON.parse(localStorage.getItem('dailyAffiliateData') || '{}');
            if (!storedData[selectedAffiliate]) {
                storedData[selectedAffiliate] = {};
            }
            storedData[selectedAffiliate][selectedDate] = numericData;
            localStorage.setItem('dailyAffiliateData', JSON.stringify(storedData));
            alert('Dados salvos com sucesso!');
        };

        return (
            <div data-name="admin-daily-edit" data-file="components/AdminDailyEdit.js" className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edição Diária de Dados</h1>

                <div className="bg-white rounded-lg p-6 card-shadow max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Afiliado</label>
                            <select
                                value={selectedAffiliate}
                                onChange={(e) => setSelectedAffiliate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione um afiliado</option>
                                {affiliates.map(affiliate => (
                                    <option key={affiliate.id} value={affiliate.id}>{affiliate.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total de Registros</label>
                            <input
                                type="text"
                                value={dailyData.totalRegistrations}
                                onChange={(e) => handleInputChange('totalRegistrations', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                onFocus={(e) => e.target.select()}
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Número de FTDs</label>
                            <input
                                type="text"
                                value={dailyData.totalFTDs}
                                onChange={(e) => handleInputChange('totalFTDs', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                onFocus={(e) => e.target.select()}
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Depósitos (USD)</label>
                            <input
                                type="text"
                                value={dailyData.totalDeposits}
                                onChange={(e) => handleInputChange('totalDeposits', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                onFocus={(e) => e.target.select()}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Comissões (USD)</label>
                            <input
                                type="text"
                                value={dailyData.totalCommissions}
                                onChange={(e) => handleInputChange('totalCommissions', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                onFocus={(e) => e.target.select()}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <button
                        onClick={saveDailyData}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <i className="fas fa-save mr-2"></i>
                        Salvar Dados Diários
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminDailyEdit component error:', error);
        reportError(error);
    }
}
