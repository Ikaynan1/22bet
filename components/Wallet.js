function Wallet() {
    try {
        const [wallet, setWallet] = React.useState('');
        const [isEditing, setIsEditing] = React.useState(false);
        const [tempWallet, setTempWallet] = React.useState('');
        const [confirmCode, setConfirmCode] = React.useState('');
        const [showConfirm, setShowConfirm] = React.useState(false);

        React.useEffect(() => {
            const savedWallet = localStorage.getItem('walletAddress') || '';
            setWallet(savedWallet);
            setTempWallet(savedWallet);
        }, []);

        const handleEdit = () => {
            setIsEditing(true);
            setTempWallet(wallet);
        };

        const handleSave = () => {
            if (!tempWallet.trim()) {
                alert('Por favor, insira um endereço de carteira válido');
                return;
            }
            setShowConfirm(true);
        };

        const confirmSave = () => {
            if (confirmCode !== '1234') {
                alert('Código de confirmação inválido');
                return;
            }
            
            localStorage.setItem('walletAddress', tempWallet);
            setWallet(tempWallet);
            setIsEditing(false);
            setShowConfirm(false);
            setConfirmCode('');
            alert('Carteira atualizada com sucesso!');
        };

        const handleCancel = () => {
            setTempWallet(wallet);
            setIsEditing(false);
            setShowConfirm(false);
            setConfirmCode('');
        };

        return (
            <div data-name="wallet" data-file="components/Wallet.js" className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Minha Carteira</h1>

                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg p-6 card-shadow mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereço da Carteira TRC20 (USDT)</h3>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Endereço da Carteira
                            </label>
                            <input
                                type="text"
                                value={isEditing ? tempWallet : wallet}
                                onChange={(e) => setTempWallet(e.target.value)}
                                readOnly={!isEditing}
                                placeholder="Insira seu endereço de carteira TRC20"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                                }`}
                            />
                        </div>

                        <div className="flex space-x-3">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <i className="fas fa-edit mr-2"></i>
                                    Editar
                                </button>
                            ) : (
                                <React.Fragment>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <i className="fas fa-save mr-2"></i>
                                        Salvar
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <i className="fas fa-times mr-2"></i>
                                        Cancelar
                                    </button>
                                </React.Fragment>
                            )}
                        </div>
                    </div>

                    {showConfirm && (
                        <div className="bg-white rounded-lg p-6 card-shadow border-l-4 border-orange-500">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Confirmação Necessária</h4>
                            <p className="text-gray-600 mb-4">
                                Para alterar sua carteira, digite o código de confirmação: <strong>1234</strong>
                            </p>
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    value={confirmCode}
                                    onChange={(e) => setConfirmCode(e.target.value)}
                                    placeholder="Digite o código"
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={confirmSave}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <i className="fas fa-info-circle text-blue-600 mr-3 mt-1"></i>
                            <div>
                                <h4 className="font-semibold text-blue-800">Importante:</h4>
                                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                                    <li>• Use apenas endereços de carteira TRC20 válidos</li>
                                    <li>• Pagamentos são processados em USDT</li>
                                    <li>• Verifique o endereço antes de salvar</li>
                                    <li>• Alterações requerem confirmação por código</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Wallet component error:', error);
        reportError(error);
    }
}
