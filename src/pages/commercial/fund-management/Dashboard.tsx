import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  FileText,
  DollarSign,
  BarChart
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fundManagementService } from "@/services/fundManagementService";
import { Link } from "react-router-dom";

export default function FundManagementDashboard() {
  // Fetch portfolios
  const { data: portfolios = [], isLoading: isLoadingPortfolios } = useQuery({
    queryKey: ['portfolios'],
    queryFn: () => fundManagementService.getPortfolios()
  });

  // Calculate portfolio summary
  const portfolioSummary = {
    totalValue: portfolios.reduce((total, portfolio) => {
      // Calculate portfolio value based on allocation percentages and a base value
      const baseValue = portfolio.id === "1" ? 1500000 : 
                        portfolio.id === "2" ? 750000 : 
                        portfolio.id === "3" ? 200000 : 500000;
      return total + baseValue;
    }, 0),
    monthlyChange: 3.2, // Mock data
    yearlyChange: 12.5, // Mock data
    allocation: {
      stocks: 65,
      bonds: 25,
      cash: 5,
      alternatives: 5
    },
    portfolios: portfolios.map(portfolio => ({
      id: portfolio.id,
      name: portfolio.name,
      value: portfolio.id === "1" ? 1500000 : 
             portfolio.id === "2" ? 750000 : 
             portfolio.id === "3" ? 200000 : 500000,
      change: portfolio.expected_return / 4, // Quarterly change (mock data)
      risk: portfolio.risk_level
    }))
  };

  // Get the first active portfolio for transactions
  const activePortfolio = portfolios.find(p => p.status === "active");

  // Fetch transactions for the active portfolio
  const { data: transactions = [], isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['portfolio-transactions', activePortfolio?.id],
    queryFn: () => activePortfolio 
      ? fundManagementService.getPortfolioTransactions(activePortfolio.id)
      : Promise.resolve([]),
    enabled: !!activePortfolio
  });

  // Format transactions for display
  const recentTransactions = transactions.map(transaction => ({
    id: transaction.id,
    type: transaction.transaction_type,
    security: transaction.security_symbol,
    amount: transaction.total_amount,
    date: transaction.created_at.split('T')[0],
    status: transaction.status
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Fund Management" 
          description="Manage your investment portfolios and trading activities"
        />

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioSummary.totalValue.toLocaleString()}</div>
              <div className="flex items-center mt-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>{portfolioSummary.monthlyChange}% this month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">YTD Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{portfolioSummary.yearlyChange}%</div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <BarChart className="h-3 w-3 mr-1" />
                <span>vs. +8.2% benchmark</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Portfolios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioSummary.portfolios.length}</div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Wallet className="h-3 w-3 mr-1" />
                <span>Across multiple strategies</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Asset Allocation */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(portfolioSummary.allocation).map(([asset, percentage]) => (
                  <div key={asset} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        asset === 'stocks' ? 'bg-blue-500' :
                        asset === 'bonds' ? 'bg-green-500' :
                        asset === 'cash' ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`} />
                      <span className="capitalize">{asset}</span>
                    </div>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Detailed Breakdown
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Portfolios */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Your Portfolios
              </CardTitle>
              <Link to="/commercial/fund-management/portfolios">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoadingPortfolios ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : portfolioSummary.portfolios.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No portfolios found
                  </div>
                ) : portfolioSummary.portfolios.map((portfolio) => (
                  <div key={portfolio.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <h3 className="font-medium">{portfolio.name}</h3>
                      <p className="text-sm text-muted-foreground">Risk: {portfolio.risk}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${portfolio.value.toLocaleString()}</p>
                      <p className={`text-sm ${portfolio.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {portfolio.change >= 0 ? '+' : ''}{portfolio.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Recent Transactions
              </CardTitle>
              <Link to="/commercial/fund-management/trade">
                <Button variant="outline" size="sm">Trade Now</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoadingTransactions ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent transactions
                  </div>
                ) : recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center">
                      {transaction.type === 'buy' ? (
                        <ArrowDownRight className="h-4 w-4 mr-2 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 mr-2 text-red-600" />
                      )}
                      <div>
                        <h3 className="font-medium">{transaction.security}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${transaction.amount.toLocaleString()}</p>
                      <p className="text-sm capitalize text-muted-foreground">{transaction.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/commercial/fund-management/trade">
                  <Button className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2" variant="outline">
                    <BarChart3 className="h-6 w-6" />
                    <span>Trade Securities</span>
                  </Button>
                </Link>
                <Link to="/commercial/fund-management/portfolios">
                  <Button className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2" variant="outline">
                    <PieChart className="h-6 w-6" />
                    <span>Manage Portfolios</span>
                  </Button>
                </Link>
                <Link to="/commercial/fund-management/reports">
                  <Button className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2" variant="outline">
                    <FileText className="h-6 w-6" />
                    <span>View Reports</span>
                  </Button>
                </Link>
                <Link to="/commercial/fund-management/portfolios/ai">
                  <Button className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2" variant="outline">
                    <TrendingUp className="h-6 w-6" />
                    <span>AI Portfolios</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
