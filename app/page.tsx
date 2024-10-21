"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, BarChart2, PieChart, TrendingUp, Shield, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts'

const lineChartData = [
  { name: 'Jan', Expenses: 4000, Income: 2400 },
  { name: 'Feb', Expenses: 3000, Income: 1398 },
  { name: 'Mar', Expenses: 2000, Income: 9800 },
  { name: 'Apr', Expenses: 2780, Income: 3908 },
  { name: 'May', Expenses: 1890, Income: 4800 },
  { name: 'Jun', Expenses: 2390, Income: 3800 },
]

const barChartData = [
  { name: 'Food', amount: 3000 },
  { name: 'Rent', amount: 2000 },
  { name: 'Utilities', amount: 1000 },
  { name: 'Entertainment', amount: 500 },
  { name: 'Transport', amount: 1500 },
]

const pieChartData = [
  { name: 'Savings', value: 400 },
  { name: 'Investments', value: 300 },
  { name: 'Expenses', value: 300 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        
        
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="px-42 lg:px-2 h-14 flex items-center">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800">
            <span className="text-2xl font-bold text-white">FT</span>
        </Link>
        <span className="font-bold text-xl"> &nbsp;FinTrack</span>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#graphs">
            Insights
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Take Control of Your Finances
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  FinTrack helps you manage your money, track expenses, and reach your financial goals with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth">
                  <Button variant="outline" className="text-black bg-gray-200">Get Started</Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" className="text-black bg-gray-200">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-6 md:py-12 lg:py-16 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-900">
                <CardHeader>
                  <BarChart2 className="h-8 w-8 mb-2 text-gray-400" />
                  <CardTitle>Expense Tracking</CardTitle>
                  <CardDescription>Easily log and categorize your expenses</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gray-900">
                <CardHeader>
                  <PieChart className="h-8 w-8 mb-2 text-gray-400" />
                  <CardTitle>Budget Planning</CardTitle>
                  <CardDescription>Set and manage budgets for different categories</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gray-900">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-gray-400" />
                  <CardTitle>Investment Monitoring</CardTitle>
                  <CardDescription>Track your investments and portfolio performance</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gray-900">
                <CardHeader>
                  <Shield className="h-8 w-8 mb-2 text-gray-400" />
                  <CardTitle>Secure Encryption</CardTitle>
                  <CardDescription>Your financial data is protected with top-tier security</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gray-900">
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-gray-400" />
                  <CardTitle>Multi-User Support</CardTitle>
                  <CardDescription>Share finances with family or team members</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gray-900">
                <CardHeader>
                  <DollarSign className="h-8 w-8 mb-2 text-gray-400" />
                  <CardTitle>Financial Insights</CardTitle>
                  <CardDescription>Get personalized tips to improve your financial health</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section id="graphs" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Interactive Financial Insights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                  <CardDescription>Monthly comparison of income and expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="Income" stroke="#8884d8" />
                      <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>Distribution of expenses by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="amount">
                        {barChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Financial Allocation</CardTitle>
                  <CardDescription>Overview of your financial distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Take Control?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Join thousands of users who have transformed their financial lives with FinTrack.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth">
                  <Button size="lg" className="text-black bg-gray-200">Get Started Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 mt-10 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2024 FinTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>

        </div>
  )
}