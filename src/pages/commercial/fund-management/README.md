# Fund Management Module

The Fund Management module is a comprehensive solution for managing investment portfolios, trading securities, and generating AI-powered portfolio recommendations.

## Features

### Portfolio Management

- Create and manage multiple investment portfolios
- View portfolio performance and asset allocation
- Track portfolio value and returns over time
- Filter portfolios by type and search by name

### Trading Platform

- Buy and sell securities in real-time
- View market data for available securities
- Place market and limit orders
- Track transaction history

### AI Portfolio Recommendations

- Generate personalized portfolio recommendations based on:
  - Risk tolerance
  - Investment goals
  - Time horizon
  - Initial investment amount
- View recommended portfolios
- Activate recommended portfolios
- Rebalance existing portfolios

### Investment Reports

- Access various investment reports
- Filter reports by type
- Download reports for offline viewing
- Schedule automated reports

## Technical Implementation

### Data Model

The module uses the following data model:

- **Portfolios**: Represents an investment portfolio with allocation, risk level, and expected returns
- **Transactions**: Represents buy/sell transactions for securities within portfolios
- **Securities**: Represents available securities for trading with current market data
- **Reports**: Represents investment reports and analysis

### Services

The module is powered by the `fundManagementService` which provides the following functionality:

- Portfolio CRUD operations
- Transaction management
- Securities data retrieval
- AI portfolio generation
- Report generation and management

### Database Schema

The module uses the following Supabase tables:

- `portfolios`: Stores portfolio data
- `portfolio_transactions`: Stores transaction data
- `securities`: Caches security market data
- `investment_reports`: Stores report data

## Pages

- **Dashboard**: Overview of portfolios, recent transactions, and quick actions
- **Portfolios**: Detailed view and management of all portfolios
- **AI Portfolios**: AI-powered portfolio recommendations and management
- **Trading**: Platform for buying and selling securities
- **Reports**: Access to investment reports and analysis

## Getting Started

1. Ensure Supabase is properly configured with the required tables
2. Run the setup script to initialize the database schema:
   ```
   node scripts/setup-fund-management.js
   ```
3. Navigate to the Fund Management module in the application
4. Create your first portfolio or generate an AI recommendation

## Integration with Other Modules

The Fund Management module integrates with:

- **Authentication**: Uses the current user's identity for portfolio ownership
- **Treasury Management**: Shares data for cash flow analysis
- **Risk Management**: Provides data for risk assessment

## Future Enhancements

- Real-time market data integration
- Advanced portfolio optimization algorithms
- Tax-loss harvesting features
- Dividend reinvestment options
- Performance benchmarking against indices
