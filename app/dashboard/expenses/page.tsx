'use client';
import React, { use, useEffect, useState } from 'react'
import ExpensesClient from './table'
import { expensesStore } from '@/data/expensesStore';

const ExpensesPage = () => {
const [expenses, setExpenses] = useState<any[]>([]); 
useEffect(() => {
  // Fetch expenses from the store
  const fetchedExpenses = expensesStore.getExpenses();
  
  // Log to ensure it's returning the correct data
  console.log('Fetched Expenses:', fetchedExpenses);

  // If there are any expenses, set them to state
  if (fetchedExpenses.length > 0) {
    setExpenses(fetchedExpenses);
  }
}, []); // Empty dependency array ensures this runs once after component mounts

return (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">Expenses</h1>
    {/* Conditionally render the expenses or a loading message */}
    {expenses.length > 0 ? (
      <ExpensesClient initialExpenses={expenses} />
    ) : (
      <p>Loading expenses...</p>
    )}
  </div>
);
};

export default ExpensesPage;

// async function fetchExpenses() {
//   const uid = userStore.getUserId()
  
//   const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/get-expense?limit=5&uid=${uid}`, {
//     headers: {
//       'projectid': '66e5d8c551335d381ad94a13',
//       'environmentId': '66e5d8c551335d381ad94a14'
//     }
//   });
//   if (!response.ok) {
//     throw new Error('Failed to fetch expenses');
//   }
//   const data = await response.json();
//   return data;
// }

// export default async function ExpensesPage() {
  // const [expenses, setExpenses] = useState<any[]>([]); // Adjust type as needed
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   const loadExpenses = async () => {
  //     try {
  //       const fetchedExpenses = await fetchExpenses();
  //       setExpenses(fetchedExpenses);
  //     } catch (err:any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadExpenses();
  // }, []);
//   const expenses = expensesStore.getExpenses()
//   // console.log(expenses)
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-8">Expenses</h1>
//       <ExpensesClient initialExpenses={expenses} />
//     </div>
//   )
// }
