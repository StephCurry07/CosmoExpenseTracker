"use client"

import { useState } from 'react'
import { IndianRupeeIcon, Filter, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Expense = {
  id: number
  name: string
  amount: number
  date: string
  category: string
}

export default function ExpensesClient({ initialExpenses }: { initialExpenses: Expense[] }) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [filterName, setFilterName] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const addExpense = () => {
    const name = prompt('Enter expense name:');
    const amount = parseFloat(prompt('Enter amount:') || '0');
    const date = prompt('Enter date (YYYY-MM-DD):') || new Date().toISOString().split('T')[0];
    const category = prompt('Enter category:');

    if (name && !isNaN(amount) && category) {
      const newExpense = {
        id: expenses.length + 1, // Simple ID generation
        name,
        amount,
        date,
        category,
      };
      setExpenses([...expenses, newExpense]);
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const filteredExpenses = expenses.filter(expense => 
    expense.name.toLowerCase().includes(filterName.toLowerCase()) &&
    (filterCategory === 'all' || expense.category === filterCategory)
  )

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const filteredTotalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">TOTAL EXPENSES</CardTitle>
            <IndianRupeeIcon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">TOTAL AMOUNT</CardTitle>
            <IndianRupeeIcon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{filteredTotalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input 
              className="w-64 bg-gray-800 border-gray-700" 
              placeholder="Filter by name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.name}</TableCell>
                <TableCell>₹{expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button onClick={addExpense} className="fixed bottom-8 right-8 rounded-full w-14 h-14 text-2xl" size="icon">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}