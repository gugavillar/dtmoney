import { Summery } from '../Summery';
import { TransactionsTable } from '../TransactionsTable';
import { Container } from './styles';

export function Dashboard() {
    return (
        <Container>
            <Summery />
            <TransactionsTable />
        </Container>
    );
}