import { Routes, Route } from "react-router-dom";
import PersonalDashboard from "@/pages/Index";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import UsersPage from "@/pages/admin/Users";
import UserProfilesPage from "@/pages/admin/UserProfiles";
import AccountsPage from "@/pages/admin/Accounts";
import AdminTransactionsPage from "@/pages/admin/Transactions";
import ProductsPage from "@/pages/admin/Products";
import SupportPage from "@/pages/admin/Support";
import AdminSettingsPage from "@/pages/admin/Settings";
import WalletPage from "@/pages/Wallet";
import CardsPage from "@/pages/Cards";
import HistoryPage from "@/pages/History";
import MarketplacePage from "@/pages/Marketplace";
import SettingsPage from "@/pages/Settings";
import TransferPage from "@/pages/Transfer";
import BillsPage from "@/pages/Bills";
import TimeDepositsPage from "@/pages/TimeDeposits";
import SavingsPage from "@/pages/Savings";
import InvestmentsPage from "@/pages/Investments";
import DepositsPage from "@/pages/Deposits";
import BusinessDashboard from "@/pages/business/Dashboard";
import CommercialDashboard from "@/pages/commercial/Dashboard";
import RiskManagement from "@/pages/commercial/RiskManagement";
import PrivateBankingDashboard from "@/pages/private/Dashboard";
import DeveloperPortal from "@/pages/developers/Dashboard";
import TreasuryDashboard from "@/pages/commercial/treasury/Dashboard";
import CashFlowAnalysis from "@/pages/commercial/treasury/CashFlow";
import TransactionManagement from "@/pages/commercial/treasury/TransactionManagement";
import InvestmentManagement from "@/pages/commercial/treasury/InvestmentManagement";
import FXOperations from "@/pages/commercial/treasury/FXOperations";
import PayrollPage from "@/pages/commercial/Payroll";
import InvoicesPage from "@/pages/commercial/Invoices";
import ExpensesPage from "@/pages/commercial/Expenses";
import TradeFinancePage from "@/pages/commercial/TradeFinance";
import PaymentProcessorPage from "@/pages/commercial/PaymentProcessor";
import FundManagement from "@/pages/commercial/fund-management/Dashboard";
import Portfolios from "@/pages/commercial/fund-management/Portfolios";
import AIPortfolios from "@/pages/commercial/fund-management/AIPortfolios";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route element={<ProtectedRoute />}>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="user-profiles" element={<UserProfilesPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="transactions" element={<AdminTransactionsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Regular User Routes */}
        <Route path="/" element={<PersonalDashboard />} />
        <Route path="/personal" element={<PersonalDashboard />} />
        
        {/* Business Routes */}
        <Route path="/business">
          <Route path="dashboard" element={<BusinessDashboard />} />
        </Route>

        {/* Commercial Banking Routes */}
        <Route path="/commercial">
          <Route path="" element={<CommercialDashboard />} />
          <Route path="dashboard" element={<CommercialDashboard />} />
          
          {/* Treasury Routes */}
          <Route path="treasury">
            <Route path="" element={<TreasuryDashboard />} />
            <Route path="cash-flow" element={<CashFlowAnalysis />} />
            <Route path="transactions" element={<TransactionManagement />} />
            <Route path="investments" element={<InvestmentManagement />} />
            <Route path="fx" element={<FXOperations />} />
          </Route>

          {/* Operations Routes */}
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="trade-finance" element={<TradeFinancePage />} />
          <Route path="risk-management/*" element={<RiskManagement />} />
          <Route path="payment-processor" element={<PaymentProcessorPage />} />

          {/* Fund Management Routes */}
          <Route path="fund-management">
            <Route path="" element={<FundManagement />} />
            <Route path="portfolios" element={<Portfolios />} />
            <Route path="portfolios/ai" element={<AIPortfolios />} />
          </Route>

          {/* Additional Commercial Routes */}
          <Route path="cards" element={<CardsPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>

        {/* Private Banking Routes */}
        <Route path="/private">
          <Route path="dashboard" element={<PrivateBankingDashboard />} />
        </Route>

        {/* Developer Routes */}
        <Route path="/developer">
          <Route path="dashboard" element={<DeveloperPortal />} />
        </Route>

        {/* Shared Routes */}
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/time-deposits" element={<TimeDepositsPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/deposits" element={<DepositsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
