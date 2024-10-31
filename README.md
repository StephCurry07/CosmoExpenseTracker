# Financial Dashboard

A React-based financial dashboard application that allows users to track their expenses, subscriptions, and overall financial health. The application fetches data from various APIs and displays it in a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and management
- Expense tracking with detailed views
- Subscription management
- Data visualization for financial insights
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Zustand (or any other state management library)
- **API**: RESTful APIs for fetching user, expenses, and subscription data
- **Build Tool**: NextJS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/StephCurry07/cosmoexpensetracker.git
   cd cosmoexpensetracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Usage

- **Overview Page**: Displays a summary of user finances, including total income, expenses, and subscriptions.
- **Expenses Page**: Allows users to add, view, and manage their expenses.
- **Subscriptions Page**: Enables users to track their subscriptions and associated costs.

### Adding Expenses

1. Click the "Add New Expense" button.
2. Fill in the required fields (title, amount, date, category).
3. Click "Submit" to save the expense.

### Adding Subscriptions

1. Click the "Add New Subscription" button.
2. Fill in the required fields (name, price, date, status).
3. Click "Submit" to save the subscription.

## API Endpoints

- **User API**: `GET https://free-ap-south-1.cosmocloud.io/development/api/expensetrackeruser`
- **Expenses API**: `GET https://free-ap-south-1.cosmocloud.io/development/api/expensetracker_expense`
- **Subscriptions API**: `GET https://free-ap-south-1.cosmocloud.io/development/api/subscription`

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
