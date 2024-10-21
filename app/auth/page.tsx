"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MailIcon, LockIcon, DollarSign, PieChart, BarChart2, TrendingUp, UserIcon } from 'lucide-react'
import { userStore } from '../../data/users'
import {expensesStore } from '../../data/expensesStore'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>(); // Default email
  const guestemail = 'guest@guest.com'
  const guestpass = 'guestinspection'
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>('')
  const [userId, setUserId] = useState<string>();

  const router = useRouter()

  async function onSignUp(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    const createdAt = new Date().toISOString()

    const userData = {
      name,
      email,
      password,
      createdAt
    }

    try {
      const userResponse = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/expensetrackeruser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectid': '66e5d8c551335d381ad94a13',
          'environmentId': '66e5d8c551335d381ad94a14'
        },
        body: JSON.stringify(userData),
      })

      if (!userResponse.ok) {
        throw new Error('Failed to create account')
      }

      const user = await userResponse.json()
      userStore.setUser(user.id, user.name, user.email)

      router.push(`/dashboard/overview`)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function onSignIn(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectid': '66e5d8c551335d381ad94a13',
          'environmentId': '66e5d8c551335d381ad94a14'
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
  
      const user = await response.json();
      console.log(user);  // Log user object to inspect its structure
  
      
      userStore.setUser(user._id, user.name, user.email);
      
  
      const expResponse = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/get-expense?limit=5&uid=${user._id}`, {
        headers: {
          'projectid': '66e5d8c551335d381ad94a13',
          'environmentId': '66e5d8c551335d381ad94a14'
        }
      });
  
      if (!expResponse.ok) {
        throw new Error('Failed to fetch expenses');
      }
  
      const expensesData = await expResponse.json();
      expensesStore.setExpenses(expensesData);
      console.log(expensesStore.getExpenses())
      setTimeout(function() {
        console.log("Hello World");
    }, 2000); // Executes after 2 seconds
    
      router.push(`/dashboard/overview`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  

  async function onGuestSubmit(event?: React.SyntheticEvent) {
    event?.preventDefault()
    setIsLoading(true)

    const guestEmail = 'guest@guest.com'
    const guestPassword = 'guestinspection'

    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectid': '66e5d8c551335d381ad94a13',
          'environmentId': '66e5d8c551335d381ad94a14'
        },
        body: JSON.stringify({ email: guestEmail, password: guestPassword }),
      })

      if (!response.ok) {
        throw new Error('Failed to sign in as guest')
      }

      const user = await response.json()
      userStore.setUser(user.id, 'Guest User', guestEmail)

      const expResponse = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/get-expense?limit=5&uid=${user.id}`, {
        headers: {
          'projectid': '66e5d8c551335d381ad94a13',
          'environmentId': '66e5d8c551335d381ad94a14'
        }
      })

      if (!expResponse.ok) {
        throw new Error('Failed to fetch guest expenses')
      }

      const expensesData = await expResponse.json()
      expensesStore.setExpenses(expensesData)

      router.push(`/dashboard/overview`)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    { icon: DollarSign, title: "Expense Tracking", description: "Easily categorize and monitor your spending habits." },
    { icon: BarChart2, title: "Budget Planning", description: "Set and manage budgets to reach your financial goals." },
    { icon: TrendingUp, title: "Investment Monitoring", description: "Track your investments and portfolio performance." },
  ]

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-gray-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary mr-2">
              <span className="text-2xl font-bold text-white">FT</span>
            </div>
            <span className="text-2xl font-bold">FinTrack</span>
          </Link>
        </div>
        <div className="relative z-20 mt-20 sm:p-12 md:p-15 lg:p-20">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Take Control of Your Finances
          </motion.h1>
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
              >
                <div className="bg-primary p-2 rounded-lg">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div 
          className="absolute bottom-10 left-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 5,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
        </motion.div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to FinTrack
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account or create a new one
            </p>
          </div>
          <Tabs defaultValue="signin" className="w-[350px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com" 
                        className="pl-8" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        className="pl-8"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={onSignIn} disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
      <div className="text-center mt-4">
          <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
              // Fill the input fields with guest credentials
              setEmail('guest@guest.com');
              setPassword('guestinspection');
              
              // Trigger the sign-in process
              onGuestSubmit();  // Calling without event since it is not a form submission
              }}
          >
              Sign In as Guest
          </Button>
        </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Enter your details to create a new account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        className="pl-8"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        className="pl-8" 
                        type="email"
                        placeholder="m@example.com"
                        value= {email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        className="pl-8"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={onSignUp} disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}