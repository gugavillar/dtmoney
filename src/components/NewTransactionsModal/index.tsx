import Modal from 'react-modal';
import { ButtonTransactions, Container, NewTransactionsContainer } from './styles';
import closeImg from '../../assets/close.svg';
import outcomeImg from '../../assets/outcome.svg';
import incomeImg from '../../assets/income.svg';
import { useState, FormEvent } from 'react';
import { useTransaction } from '../../hooks/useTransactions';

interface NewTransactionsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


Modal.setAppElement('#root');

export function NewTransactionsModal({ isOpen, onRequestClose }: NewTransactionsModalProps) {
    const { createTransaction } = useTransaction();
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="react-modal-content"
            overlayClassName="react-modal-overlay">
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input type="text"
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)} />
                <input type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))} />
                <NewTransactionsContainer>
                    <ButtonTransactions type="button" onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor="green">
                        <img src={incomeImg} alt="Entradas" />
                        <span>Entradas</span>
                    </ButtonTransactions>
                    <ButtonTransactions type="button" onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor="red">
                        <img src={outcomeImg} alt="Saídas" />
                        <span>Saídas</span>
                    </ButtonTransactions>
                </NewTransactionsContainer>
                <input type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)} />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}