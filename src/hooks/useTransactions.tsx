import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { format } from '../utils/format';
import { database } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';

interface Transactions {
    id: string;
    title: string;
    amount: number;
    category: string;
    type: string;
    createdAt: string;
    amountFormat: string;
    createdAtFormat: string;
}

type TransactionsFirebase = Record<string, {
    id: string;
    title: string;
    amount: number;
    category: string;
    type: string;
    createdAt: string;
}>

type TransactionInput = Omit<Transactions, 'id' | 'createdAt' | 'amountFormat' | 'createdAtFormat'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transactions[];
    createTransaction: (transaction: TransactionInput) => void
    deleteTransaction: (id: string) => void;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const transactionsRef = database.ref(`transactions/${user?.id}`);
        transactionsRef.on('value', transaction => {
            const transactionsFirebase: TransactionsFirebase = transaction.val() || {};
            const transactionsFormatted = Object.entries(transactionsFirebase).map(([key, value]) => {
                return {
                    id: key,
                    title: value.title,
                    amount: value.amount,
                    category: value.category,
                    type: value.type,
                    createdAt: value.createdAt,
                    amountFormat: format.format(value.amount),
                    createdAtFormat: new Date(value.createdAt).toLocaleDateString('pt-BR')
                }
            });
            setTransactions(transactionsFormatted);

            return () => {
                transactionsRef.off('value');
            }
        });
    }, [user?.id]);

    async function createTransaction(transactionInput: TransactionInput) {
        const transaction = {
            ...transactionInput,
            createdAt: new Date().getTime()
        };
        await database.ref(`/transactions/${user?.id}`).push(transaction);
    }

    async function deleteTransaction(id: string) {
        await database.ref(`/transactions/${user?.id}/${id}`).remove();
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction, deleteTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransaction() {
    const context = useContext(TransactionsContext);
    return context;
}