import { useTransaction } from '../../hooks/useTransactions';
import { Container } from './styles';

export function TransactionsTable() {
    const { transactions } = useTransaction();
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>{transaction.amountFormat}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.createdAtFormat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}