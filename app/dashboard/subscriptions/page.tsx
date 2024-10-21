"use client";

import { useState } from 'react';
import SubscriptionsClient from './table';
import { Button } from '@/components/ui/button';
import { IndianRupee, Filter, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Subscription = {
  id: number;
  name: string;
  price: number;
  date: string;
  status: string;
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: 1, name: 'Netflix', price: 12.99, date: '2023-01-01', status: 'Active' },
    { id: 2, name: 'Spotify', price: 9.99, date: '2023-02-01', status: 'Active' },
    { id: 3, name: 'Hulu', price: 11.99, date: '2023-03-01', status: 'Pending' },
    { id: 4, name: 'Gym Membership', price: 50.00, date: '2023-04-01', status: 'Expired' },
  ]);

  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    price: '',
    date: '',
    status: 'Active',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSubscription(prev => ({ ...prev, [name]: value }));
  };

  const addSubscription = () => {
    const { name, price, date, status } = newSubscription;
    if (name && !isNaN(parseFloat(price)) && status) {
      const newSubscriptionData = {
        id: subscriptions.length + 1, // Simple ID generation
        name,
        price: parseFloat(price),
        date: date || new Date().toISOString().split('T')[0],
        status,
      };
      setSubscriptions([...subscriptions, newSubscriptionData]);
      setNewSubscription({ name: '', price: '', date: '', status: 'Active' }); // Reset form
      setIsModalOpen(false); // Close the input card
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Subscriptions</h1>
      <SubscriptionsClient initialSubscriptions={subscriptions} />
    
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="bg-gray-800 w-96">
            <CardHeader>
              <CardTitle>Add New Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                name="name"
                placeholder="Subscription Name"
                value={newSubscription.name}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={newSubscription.price}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                name="date"
                type="date"
                value={newSubscription.date}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Select name="status" value={newSubscription.status} onValueChange={(value) => setNewSubscription(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className="w-[180px] bg-gray-200 border-gray-700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addSubscription} className="mt-2">Submit</Button>
              <Button onClick={() => setIsModalOpen(false)} className="mt-2 ml-2" variant="outline">Cancel</Button>
            </CardContent>
          </Card>
        </div>
      )}
      <Button onClick={() => setIsModalOpen(true)} className="fixed bottom-8 right-8 rounded-full w-14 h-14 text-2xl" size="icon">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
