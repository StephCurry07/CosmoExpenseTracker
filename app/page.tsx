import { CalendarIcon, DollarSignIcon, CreditCardIcon, TrendingUpIcon, BellIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerProvider } from '@/components/context/datepicker-provider';
import { OverviewContextProvider } from '@/components/context/overview-provider';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Sidebar } from '@/components/Sidebar';

const SummaryCard = ({ title, value, icon: Icon }) => (
  <Card className="bg-gray-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">₹{value}</div>
    </CardContent>
  </Card>
)

const ReportCard = ({ title, description }) => (
  <Card className="bg-gray-800">
    <CardHeader>
      <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
      <p className="text-sm text-gray-400">{description}</p>
    </CardHeader>
    <CardContent className="h-48 flex items-center justify-center">
      <p className="text-gray-500">No data</p>
    </CardContent>
  </Card>
)

export default function FinancialDashboard() {
  return (		
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Overview</h1>
          <div className="flex items-center space-x-4">
            
              <DateRangePicker />
          
            <Select>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Month to Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mtd">Month to Date</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <SummaryCard title="TOTAL INCOME" value="0" icon={DollarSignIcon} />
          <SummaryCard title="AVAILABLE BALANCE" value="0" icon={CreditCardIcon} />
          <SummaryCard title="TOTAL SPENT" value="0" icon={TrendingUpIcon} />
          <SummaryCard title="TOTAL INVESTMENT" value="0" icon={TrendingUpIcon} />
          <SummaryCard title="TOTAL SUBSCRIPTIONS" value="0" icon={BellIcon} />
        </div>

        <h2 className="text-xl font-semibold mb-4">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReportCard 
            title="Expenses" 
            description="Amount spent for the selected date range."
          />
          <ReportCard 
            title="Subscriptions" 
            description="Estimated total amount spent for selected date range."
          />
        </div>
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-8 right-8 rounded-full w-14 h-14 text-2xl" size="icon">
        +
      </Button>
    </div>
  )
}
