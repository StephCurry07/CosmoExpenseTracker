const baseUrl = 'https://free-ap-south-1.cosmocloud.io/development/api';

export const apiUrls = {
    user: {
        getUser: `${baseUrl}/cosmouser`,
        fetchUser: `${baseUrl}/cosmouser`,
    },
    expenses: {
        createExpense: `${baseUrl}/cosmoexpense`,
        getExpenses: (): string => `${baseUrl}/expense/_get-expense`,
    },
};
