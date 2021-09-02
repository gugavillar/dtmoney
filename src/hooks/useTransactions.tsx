import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';
import { format } from '../utils/format';

interface Transactions {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: string;
    createdAt: string;
    amountFormat: string;
    createdAtFormat: string;
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt' | 'amountFormat' | 'createdAtFormat'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transactions[];
    createTransaction: (transaction: TransactionInput) => void
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([]);
    useEffect(() => {
        api.get('/transactions').then(response => {
            const transactionsFormat = response.data?.transactions.map((transaction: Transactions) => {
                return {
                    id: transaction.id,
                    title: transaction.title,
                    amount: transaction.amount,
                    category: transaction.category,
                    type: transaction.type,
                    createdAt: transaction.createdAt,
                    amountFormat: format.format(transaction.amount),
                    createdAtFormat: new Intl.DateTimeFormat('pt-br').format(new Date(transaction.createdAt))
                }
            });
            setTransactions(transactionsFormat);
        });
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        const { transaction } = response.data;
        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransaction() {
    const context = useContext(TransactionsContext);
    return context;
}