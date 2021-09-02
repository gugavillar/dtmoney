import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransaction } from '../../hooks/useTransactions';
import { Container } from './styles';
import { format } from '../../utils/format';

export function Summery() {
    const { transactions } = useTransaction();
    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposit += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraw += transaction.amount;
            acc.total -= transaction.amount;
        }
        return acc;
    }, {
        deposit: 0,
        withdraw: 0,
        total: 0
    });
    const depositFormat = format.format(summary.deposit);
    const withdrawFormat = format.format(summary.withdraw);
    const totalFormat = format.format(summary.total);
    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {depositFormat}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    {withdrawFormat}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {totalFormat}
                </strong>
            </div>
        </Container>
    );
}