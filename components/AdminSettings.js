function AdminSettings() {
    try {
        const [settings, setSettings] = React.useState({
            commissionRate: 30,
            minPayout: 100,
            ftdGoal: 10,
            autoPayouts: false
        });

        const [newAffiliate, setNewAffiliate] = React.useState({
            name: '',
            email: '',
            password: ''
        });

        const handleSettingChange = (key, value) => {
            setSettings(prev => ({ ...prev, [key]: value }));
        };

        const saveSettings = () => {
            localStorage.setItem('adminSettings', JSON.stringify(settings));
            alert('Configurações salvas com sucesso!');
        };

        const createAffiliate = () => {
            if (!newAffiliate.name || !newAffiliate.email || !newAffiliate.password) {
                alert('Preencha todos os campos');
                return;
            }
            
            alert(`Afiliado ${newAffiliate.name} criado com sucesso!`);
            setNewAffiliate({ name: '', email: '', password: '' });
        };

        return (
            <div data-name="admin-settings" data-file="components/AdminSettings.js" className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Configurações</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Configurações Gerais</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Taxa de Comissão (%)
                                </label>
                                <input
                                    type="number"
                                    value={settings.commissionRate}
                                    onChange={(e) => handleSettingChange('commissionRate', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pagamento Mínimo ($)
                                </label>
                                <input
                                    type="number"
                                    value={settings.minPayout}
                                    onChange={(e) => handleSettingChange('minPayout', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta de FTDs
                                </label>
                                <input
                                    type="number"
                                    value={settings.ftdGoal}
                                    onChange={(e) => handleSettingChange('ftdGoal', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.autoPayouts}
                                    onChange={(e) => handleSettingChange('autoPayouts', e.target.checked)}
                                    className="mr-2"
                                />
                                <label className="text-sm text-gray-700">Pagamentos Automáticos</label>
                            </div>

                            <button
                                onClick={saveSettings}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Salvar Configurações
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Criar Novo Afiliado</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                                <input
                                    type="text"
                                    value={newAffiliate.name}
                                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nome do afiliado"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={newAffiliate.email}
                                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="email@exemplo.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                                <input
                                    type="password"
                                    value={newAffiliate.password}
                                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Senha inicial"
                                />
                            </div>

                            <button
                                onClick={createAffiliate}
                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Criar Afiliado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminSettings component error:', error);
        reportError(error);
    }
}
