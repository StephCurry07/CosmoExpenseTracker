import React from 'react'
import { ArrowUpDown, ChevronDown, DollarSign, Filter, MoreHorizontal, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


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

export default function ExpensesPage() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Expenses</h1>
          <Button variant="outline">Feedback</Button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <SummaryCard title="TOTAL EXPENSES" value="0" icon={DollarSign} />
          <SummaryCard title="TOTAL AMOUNT" value="0" icon={DollarSign} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input 
                className="w-64 bg-gray-800 border-gray-700" 
                placeholder="Filter by name"
              />
              <Select>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {/* Add more categories here */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="This Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  Name <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Spent Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Paid Via</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No expenses found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-8 right-8 rounded-full w-14 h-14 text-2xl" size="icon">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
