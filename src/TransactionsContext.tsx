import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: 'deposit' | 'withdraw'
  category: string
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode  
}

export const TransactionsConext = createContext<Transaction[]>([])

export function TransactionsProvider({
  children
}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <TransactionsConext.Provider value={transactions}>
      {children}
    </TransactionsConext.Provider>
  )
}