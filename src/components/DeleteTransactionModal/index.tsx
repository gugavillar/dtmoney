import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import deleteModal from '../../assets/delete_modal.svg';
import { useTransaction } from '../../hooks/useTransactions';
import { Container } from './styles';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  transactionId: string;
}


export function DeleteTransactionModal({ isOpen, onRequestClose, transactionId }: DeleteTransactionModalProps) {
  const { deleteTransaction } = useTransaction();
  async function handleDeleteTransaction() {
    await deleteTransaction(transactionId);
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
      <Container>
        <div>
          <img src={deleteModal} alt="Delete Modal" />
        </div>
        <p>Tem certeza que deseja excluir essa transação.</p>
        <div className="buttons">
          <button onClick={onRequestClose}>Não</button>
          <button onClick={handleDeleteTransaction}>Sim</button>
        </div>
      </Container>
    </Modal>
  )
}