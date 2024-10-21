let expenses = [];

export const expensesStore = {
  setExpenses: (newExpenses) => {
    expenses = newExpenses; // Set the entire expenses array
  },
  addExpense: (expense) => {
    expenses.push(expense); // Add a single expense
  },
  clearExpenses: () => {
    expenses = []; // Clear all expenses
  },
  getExpenses: () => expenses, // Get the current expenses array
};
