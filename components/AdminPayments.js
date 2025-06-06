function AdminPayments() {
    try {
        const [payments, setPayments] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            loadPayments();
        }, []);

        const loadPayments = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                
                const mockPayments = Array.from({ length: 12 }, (_, i) => ({
                    id: i + 1,
                    affiliateName: `Afiliado ${i + 1}`,
                    amount: Math.floor(Math.random() * 2000) + 500,
                    wallet: `TRX${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    requestDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                    status: ['pending', 'processing', 'paid'][Math.floor(Math.random() * 3)]
                }));
                
                setPayments(mockPayments);
            } catch (error) {
                console.error('Erro ao carregar pagamentos:', error);
            } finally {
                setLoading(false);
            }
        };

        const updatePaymentStatus = (id, newStatus) => {
            setPayments(payments.map(payment => 
                payment.id === id ? { ...payment, status: newStatus } : payment
            ));
        };

        const getStatusBadge = (status) => {
            const badges = {
                pending: 'bg-yellow-100 text-yellow-800',
                processing: 'bg-blue-100 text-blue-800',
                paid: 'bg-green-100 text-green-800'
            };
            return badges[status] || 'bg-gray-100 text-gray-800';
        };

        const getStatusText = (status) => {
            const texts = {
                pending: 'Pendente',
                processing: 'Processando',
                paid: 'Pago'
            };
            return texts[status] || status;
        };

        return (
            <div data-name="admin-payments" data-file="components/AdminPayments.js" className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Gerenciar Pagamentos</h1>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <i className="fas fa-download mr-2"></i>
                        Exportar CSV
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Afiliado</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carteira</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {payments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{payment.affiliateName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                                ${payment.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                                                {payment.wallet}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {payment.requestDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(payment.status)}`}>
                                                    {getStatusText(payment.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {payment.status === 'pending' && (
                                                    <React.Fragment>
                                                        <button
                                                            onClick={() => updatePaymentStatus(payment.id, 'processing')}
                                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs mr-2 hover:bg-blue-200"
                                                        >
                                                            Processar
                                                        </button>
                                                        <button
                                                            onClick={() => updatePaymentStatus(payment.id, 'paid')}
                                                            className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                                                        >
                                                            Marcar Pago
                                                        </button>
                                                    </React.Fragment>
                                                )}
                                                {payment.status === 'processing' && (
                                                    <button
                                                        onClick={() => updatePaymentStatus(payment.id, 'paid')}
                                                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                                                    >
                                                        Marcar Pago
                                                    </button>
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
        console.error('AdminPayments component error:', error);
        reportError(error);
    }
}
