import { useTransaction } from '../../hooks/useTransactions';
import { Container } from './styles';
import { FiTrash } from 'react-icons/fi';
import { DeleteTransactionModal } from '../DeleteTransactionModal';
import { useState } from 'react';

export function TransactionsTable() {
    const { transactions } = useTransaction();
    const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    function handleOpenDeleteTransactionModal(id: string) {
        setIsDeleteTransactionModalOpen(true);
        setTransactionId(id);
    }

    function handleCloseDeleteTransactionModal() {
        setIsDeleteTransactionModalOpen(false);
    }
    return (
        <>
            <Container>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td className={transaction.type}>{transaction.amountFormat}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.createdAtFormat}</td>
                                <td>
                                    <button onClick={() => handleOpenDeleteTransactionModal(transaction.id)}><FiTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
            <DeleteTransactionModal isOpen={isDeleteTransactionModalOpen} onRequestClose={handleCloseDeleteTransactionModal} transactionId={transactionId} />
        </>
    );
}