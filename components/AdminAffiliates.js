function AdminAffiliates() {
    try {
        const [affiliates, setAffiliates] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [editingAffiliate, setEditingAffiliate] = React.useState(null);
        const [editData, setEditData] = React.useState({});

        React.useEffect(() => {
            loadAffiliates();
        }, []);

        const loadAffiliates = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                
                const mockAffiliates = Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    name: `Afiliado ${i + 1}`,
                    email: `afiliado${i + 1}@example.com`,
                    wallet: `TRX${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    totalRegistrations: Math.floor(Math.random() * 100) + 20,
                    totalFTDs: Math.floor(Math.random() * 30) + 5,
                    totalDeposits: (Math.random() * 50000 + 10000).toFixed(2),
                    totalCommissions: (Math.random() * 5000 + 1000).toFixed(2),
                    status: Math.random() > 0.2 ? 'active' : 'blocked'
                }));
                
                setAffiliates(mockAffiliates);
            } catch (error) {
                console.error('Erro ao carregar afiliados:', error);
            } finally {
                setLoading(false);
            }
        };

        const startEdit = (affiliate) => {
            setEditingAffiliate(affiliate.id);
            setEditData({
                totalRegistrations: affiliate.totalRegistrations.toString(),
                totalFTDs: affiliate.totalFTDs.toString(),
                totalDeposits: parseFloat(affiliate.totalDeposits).toString(),
                totalCommissions: parseFloat(affiliate.totalCommissions).toString()
            });
        };

        const handleInputChange = (field, value) => {
            setEditData(prev => ({
                ...prev,
                [field]: value
            }));
        };

        const saveEdit = () => {
            const numericData = {
                totalRegistrations: parseInt(editData.totalRegistrations) || 0,
                totalFTDs: parseInt(editData.totalFTDs) || 0,
                totalDeposits: parseFloat(editData.totalDeposits) || 0,
                totalCommissions: parseFloat(editData.totalCommissions) || 0
            };

            setAffiliates(affiliates.map(affiliate => 
                affiliate.id === editingAffiliate 
                    ? { 
                        ...affiliate, 
                        totalRegistrations: numericData.totalRegistrations,
                        totalFTDs: numericData.totalFTDs,
                        totalDeposits: numericData.totalDeposits.toFixed(2),
                        totalCommissions: numericData.totalCommissions.toFixed(2)
                    }
                    : affiliate
            ));
            
            // Salvar histórico diário
            const today = new Date().toISOString().split('T')[0];
            const dailyData = JSON.parse(localStorage.getItem('dailyAffiliateData') || '{}');
            if (!dailyData[editingAffiliate]) dailyData[editingAffiliate] = {};
            dailyData[editingAffiliate][today] = numericData;
            localStorage.setItem('dailyAffiliateData', JSON.stringify(dailyData));
            
            setEditingAffiliate(null);
            setEditData({});
            alert('Dados atualizados com sucesso!');
        };

        const cancelEdit = () => {
            setEditingAffiliate(null);
            setEditData({});
        };

        const toggleStatus = (id) => {
            setAffiliates(affiliates.map(affiliate => 
                affiliate.id === id 
                    ? { ...affiliate, status: affiliate.status === 'active' ? 'blocked' : 'active' }
                    : affiliate
            ));
        };

        const getStatusBadge = (status) => {
            return status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800';
        };

        return (
            <div data-name="admin-affiliates" data-file="components/AdminAffiliates.js" className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Gerenciar Afiliados</h1>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus mr-2"></i>
                        Novo Afiliado
                    </button>
                </div>

                <div className="bg-white rounded-lg card-shadow">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registros</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">FTDs</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Depósitos</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comissões</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {affiliates.map((affiliate) => (
                                        <tr key={affiliate.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{affiliate.name}</div>
                                                <div className="text-sm text-gray-500">{affiliate.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {editingAffiliate === affiliate.id ? (
                                                    <input
                                                        type="text"
                                                        value={editData.totalRegistrations}
                                                        onChange={(e) => handleInputChange('totalRegistrations', e.target.value)}
                                                        className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                                                        onFocus={(e) => e.target.select()}
                                                    />
                                                ) : affiliate.totalRegistrations}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {editingAffiliate === affiliate.id ? (
                                                    <input
                                                        type="text"
                                                        value={editData.totalFTDs}
                                                        onChange={(e) => handleInputChange('totalFTDs', e.target.value)}
                                                        className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                                                        onFocus={(e) => e.target.select()}
                                                    />
                                                ) : affiliate.totalFTDs}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {editingAffiliate === affiliate.id ? (
                                                    <input
                                                        type="text"
                                                        value={editData.totalDeposits}
                                                        onChange={(e) => handleInputChange('totalDeposits', e.target.value)}
                                                        className="w-24 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                                                        onFocus={(e) => e.target.select()}
                                                    />
                                                ) : `$${parseFloat(affiliate.totalDeposits).toLocaleString()}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                                {editingAffiliate === affiliate.id ? (
                                                    <input
                                                        type="text"
                                                        value={editData.totalCommissions}
                                                        onChange={(e) => handleInputChange('totalCommissions', e.target.value)}
                                                        className="w-24 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                                                        onFocus={(e) => e.target.select()}
                                                    />
                                                ) : `$${parseFloat(affiliate.totalCommissions).toLocaleString()}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(affiliate.status)}`}>
                                                    {affiliate.status === 'active' ? 'Ativo' : 'Bloqueado'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {editingAffiliate === affiliate.id ? (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={saveEdit}
                                                            className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                                                        >
                                                            Salvar
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => startEdit(affiliate)}
                                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => toggleStatus(affiliate.id)}
                                                            className={`px-3 py-1 rounded text-xs ${
                                                                affiliate.status === 'active' 
                                                                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            }`}
                                                        >
                                                            {affiliate.status === 'active' ? 'Bloquear' : 'Ativar'}
                                                        </button>
                                                    </div>
                                                )}
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
        console.error('AdminAffiliates component error:', error);
        reportError(error);
    }
}
