import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
    const { signIn, user } = useContext(AuthContext);

    async function handleSignIn() {
        await signIn();
    }

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
                {!user && <button type="button" onClick={handleSignIn}>
                    Login
                </button>}
            </Content>
        </Container>
    )
}