'use client';

import { useRouter } from 'next/navigation';
import { IndianRupeeIcon, DollarSignIcon, CreditCardIcon, TrendingUpIcon, BellIcon, HelpCircleIcon, SettingsIcon, LogOutIcon, PieChart } from 'lucide-react';

const SidebarIcon = ({ icon: Icon, href }) => {
  const router = useRouter();
  return (
    <div 
      className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer"
      onClick={() => router.push(href)}
    >
      <Icon size={24} />
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="w-12 bg-gray-800 flex flex-col items-center py-4 space-y-2">
      <SidebarIcon icon={PieChart} href="/dashboard/overview" />
      <SidebarIcon icon={IndianRupeeIcon} href="/dashboard/expenses" />
      <SidebarIcon icon={CreditCardIcon} href="/dashboard/subscriptions" />
      <SidebarIcon icon={TrendingUpIcon} href="/dashboard/investments" />
      <SidebarIcon icon={BellIcon} href="#" />
      <div className="flex-grow" />
      <SidebarIcon icon={HelpCircleIcon} href="#" />
      <SidebarIcon icon={SettingsIcon} href="#" />
      <SidebarIcon icon={LogOutIcon} href="/auth" />
    </div>
  );
}
