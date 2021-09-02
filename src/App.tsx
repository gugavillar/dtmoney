import { Dashboard } from './components/Dashboad';
import { Header } from './components/Header';
import { NewTransactionsModal } from './components/NewTransactionsModal';
import { GlobalStyles } from './styles/global';
import { useState } from 'react';
import { TransactionsProvider } from './hooks/useTransactions';
import { AuthProvider } from './context/AuthContext';

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <AuthProvider>
      <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <Dashboard />
        <NewTransactionsModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
        <GlobalStyles />
      </TransactionsProvider>
    </AuthProvider>
  );
}