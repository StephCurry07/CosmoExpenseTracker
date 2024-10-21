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

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('guest@guest.com'); // Default email
  const [password, setPassword] = useState<string>('guestinspection');
  const router = useRouter()
  async function onSubmit(event?: React.SyntheticEvent) {
    event?.preventDefault()
    setIsLoading(true)

    // Simulate API call for authentication
    await new Promise(resolve => setTimeout(resolve, 2000))

    // For demonstration, we'll consider the auth successful if both fields are filled
    if (email && password) {
      // Redirect to overview page
      router.push('/dashboard/overview')
    } else {
      alert('Please enter both email and password')
    }

    setIsLoading(false)
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
                        value="" 
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
                        value=""
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
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
                onSubmit();  // Calling without event since it is not a form submission
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
                      <Input id="name" placeholder="John Doe" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="m@example.com" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" className="pl-8" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
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