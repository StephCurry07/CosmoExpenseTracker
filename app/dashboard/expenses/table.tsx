"use client"

import { useState } from 'react'
import { IndianRupeeIcon, Filter, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { userStore } from '@/data/users'

type Expense = {
  userId: string
  title: string
  amount: number
  date: string
  category: string
  createdAt: string
}

export default function ExpensesClient({ initialExpenses }: { initialExpenses: Expense[] }) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [filterName, setFilterName] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    userId: userStore.getUserId(),
    title: '',
    amount: '',
    category: 'Food',
    date: '',
    createdAt: new Date().toISOString()
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExpense(prev => ({ ...prev, [name]: value }))
  }

  const addExpense = async () => {
    const { title, amount, date, category } = newExpense
    if (title && amount && date && category) {
      const newExpenseData = {
        userId: userStore.getUserId(),
        title,
        amount: parseFloat(amount),
        date,
        category,
        createdAt: new Date().toISOString()
      }

      try {
        const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/expensetracker_expense', {
          method: 'POST',
          headers: {
            'projectid': '66e5d8c551335d381ad94a13',
            'environmentId': '66e5d8c551335d381ad94a14',
          },
          body: JSON.stringify(newExpenseData),
        })

        if (!response.ok) {
          throw new Error('Failed to add expense')
        }

        setExpenses([...expenses, newExpenseData])
        setNewExpense({userId: userStore.getUserId(),  title: '', amount: '', date: '', category: 'Food', createdAt: '' })
        setIsModalOpen(false)
      } catch (error) {
        alert(error instanceof Error ? error.message : 'An error occurred')
      }
    }
  }

  const filteredExpenses = expenses.filter(expense => 
    expense.title.toLowerCase().includes(filterName.toLowerCase()) &&
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
            <CardTitle className="text-sm font-medium text-gray-400">FILTERED TOTAL</CardTitle>
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
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4">Amount</TableHead>
              <TableHead className="w-1/4">Date</TableHead>
              <TableHead className="w-1/4">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.title}</TableCell>
                <TableCell>₹{expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="bg-gray-800 w-96">
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                name="title"
                placeholder="Expense Name"
                value={newExpense.title}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                name="amount"
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                name="date"
                type="date"
                value={newExpense.date}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Select 
                value={newExpense.category} 
                onValueChange={(value) => setNewExpense(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="w-full bg-gray-200 border-gray-700">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
                <Button onClick={addExpense}>Submit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Button onClick={() => setIsModalOpen(true)} className="fixed bottom-8 right-8 rounded-full w-14 h-14 text-2xl" size="icon">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}