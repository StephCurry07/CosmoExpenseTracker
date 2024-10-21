"use client"

import { useState } from 'react';
import { DollarSign, Filter, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Subscription = {
  id: number;
  name: string;
  price: number;
  date: string;
  status: string;
};

export default function SubscriptionsClient({ initialSubscriptions }: { initialSubscriptions: Subscription[] }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSubscriptions = subscriptions.filter(subscription => 
    subscription.name.toLowerCase().includes(filterName.toLowerCase()) &&
    (filterStatus === 'all' || subscription.status.toLowerCase() === filterStatus.toLowerCase())
  );

  const totalSubscriptions = subscriptions.reduce((sum, subscription) => sum + subscription.price, 0);
  const filteredTotalSubscriptions = filteredSubscriptions.reduce((sum, subscription) => sum + subscription.price, 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">TOTAL SUBSCRIPTIONS</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{totalSubscriptions.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">TOTAL AMOUNT</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{filteredTotalSubscriptions.toFixed(2)}</div>
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
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
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>₹{subscription.price.toFixed(2)}</TableCell>
                <TableCell>{subscription.date}</TableCell>
                <TableCell>{subscription.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
