import React from 'react'
import { ArrowUpDown, ChevronDown, DollarSign, Filter, MoreHorizontal, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ExpensesClient from './table'

async function fetchExpenses() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock data
  return [
    { id: 1, name: 'Groceries', amount: 150.50, date: '2023-05-01', category: 'Food', paymentMethod: 'Credit Card' },
    { id: 2, name: 'Electricity Bill', amount: 80.00, date: '2023-05-03', category: 'Utilities', paymentMethod: 'Bank Transfer' },
    { id: 3, name: 'Netflix Subscription', amount: 12.99, date: '2023-05-05', category: 'Entertainment', paymentMethod: 'PayPal' },
    { id: 4, name: 'Gym Membership', amount: 50.00, date: '2023-05-10', category: 'Health', paymentMethod: 'Debit Card' },
    { id: 5, name: 'Restaurant Dinner', amount: 65.75, date: '2023-05-15', category: 'Food', paymentMethod: 'Credit Card' },
  ]
}

const SummaryCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
  <Card className="bg-gray-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{title === 'TOTAL AMOUNT' ? '₹' : ''}{value}</div>
    </CardContent>
  </Card>
)

export default async function ExpensesPage() {
  const expenses = await fetchExpenses()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Expenses</h1>
      <ExpensesClient initialExpenses={expenses} />
    </div>
  )
}
