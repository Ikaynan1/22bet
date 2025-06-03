function MyLink() {
    try {
        const [affiliateLink] = React.useState('https://affiglobal.com/ref/ABC123XYZ');
        const [clicks, setClicks] = React.useState(0);
        const [copied, setCopied] = React.useState(false);

        React.useEffect(() => {
            setClicks(Math.floor(Math.random() * 500) + 100);
        }, []);

        const copyToClipboard = async () => {
            try {
                await navigator.clipboard.writeText(affiliateLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('Erro ao copiar:', error);
                alert('Erro ao copiar o link');
            }
        };

        return (
            <div data-name="my-link" data-file="components/MyLink.js" className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Meu Link de Afiliado</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Link de Referência</h3>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-600 mb-2">Seu link único:</p>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={affiliateLink}
                                    readOnly
                                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        copied 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {copied ? (
                                        <React.Fragment>
                                            <i className="fas fa-check mr-1"></i>
                                            Copiado!
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <i className="fas fa-copy mr-1"></i>
                                            Copiar
                                        </React.Fragment>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                                <p className="text-blue-800 text-sm">
                                    Compartilhe este link para ganhar comissões por cada novo jogador que se registrar e fizer depósitos.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas do Link</h3>
                        
                        <div className="text-center">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-mouse-pointer text-blue-600 text-2xl"></i>
                            </div>
                            
                            <h4 className="text-3xl font-bold text-gray-800 mb-2">
                                {clicks.toLocaleString()}
                            </h4>
                            <p className="text-gray-600">Cliques únicos</p>
                            
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Taxa de conversão:</span>
                                    <span className="font-semibold text-green-600">
                                        {((clicks * 0.15) / clicks * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MyLink component error:', error);
        reportError(error);
    }
}
