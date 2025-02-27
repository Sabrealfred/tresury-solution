import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowDownUp, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  DollarSign, 
  LineChart, 
  Loader2, 
  RefreshCw, 
  Search 
} from "lucide-react";
import { fundManagementService } from "@/services/fundManagementService";
import { useQuery } from "@tanstack/react-query";

// Interface for securities with additional UI-specific properties
interface SecurityWithUIData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export default function TradingPlatform() {
  const [orderType, setOrderType] = useState("market");
  const [action, setAction] = useState("buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Fetch securities from the service
  const { data: securitiesData = [], isLoading: isLoadingSecurities } = useQuery({
    queryKey: ['securities'],
    queryFn: () => fundManagementService.getSecurities()
  });

  // Transform securities data to include UI-specific properties
  const securities: SecurityWithUIData[] = securitiesData.map(security => ({
    symbol: security.symbol,
    name: security.name,
    price: security.current_price,
    change: security.current_price * (security.change_percentage / 100),
    changePercent: security.change_percentage,
    volume: security.volume
  }));

  // Filter securities based on search query
  const filteredSecurities = securities.filter(security => 
    security.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    security.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch recent transactions
  const { data: portfolios = [] } = useQuery({
    queryKey: ['portfolios'],
    queryFn: () => fundManagementService.getPortfolios()
  });

  // Get the first active portfolio for demo purposes
  const activePortfolio = portfolios.find(p => p.status === "active");

  // Fetch transactions for the active portfolio
  const { data: transactions = [] } = useQuery({
    queryKey: ['portfolio-transactions', activePortfolio?.id],
    queryFn: () => activePortfolio 
      ? fundManagementService.getPortfolioTransactions(activePortfolio.id)
      : Promise.resolve([]),
    enabled: !!activePortfolio
  });

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const handleSubmitOrder = async () => {
    if (!symbol || !quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (orderType === "limit" && !price) {
      toast({
        title: "Error",
        description: "Please specify a limit price",
        variant: "destructive",
      });
      return;
    }

    if (!activePortfolio) {
      toast({
        title: "Error",
        description: "No active portfolio found. Please create a portfolio first.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Find the security details
      const security = securities.find(s => s.symbol === symbol);
      if (!security) throw new Error("Security not found");
      
      // Create the transaction
      const transaction = {
        portfolio_id: activePortfolio.id,
        security_symbol: symbol,
        security_name: security.name,
        transaction_type: action as "buy" | "sell",
        quantity: parseInt(quantity),
        price: orderType === "market" ? security.price : parseFloat(price),
        total_amount: orderType === "market" 
          ? security.price * parseInt(quantity) 
          : parseFloat(price) * parseInt(quantity),
        status: "completed" as "completed" | "pending" | "cancelled"
      };
      
      // Submit the transaction
      await fundManagementService.createTransaction(transaction);
      
      toast({
        title: "Order Submitted",
        description: `${action.toUpperCase()} ${quantity} ${symbol} at ${orderType === "market" ? "market price" : `$${price}`}`,
      });
      
      // Reset form
      setQuantity("");
      setPrice("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Securities Trading" 
          description="Trade securities and manage your investment portfolio"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Market Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Market Overview</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                    <Input 
                      placeholder="Search securities" 
                      className="pl-8 h-9 w-[200px]" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b px-4 py-2 font-medium">
                  <div>Symbol</div>
                  <div className="col-span-2">Name</div>
                  <div className="text-right">Price</div>
                  <div className="text-right">Change</div>
                  <div className="text-right">Volume</div>
                </div>
                <div className="divide-y">
                  {isLoadingSecurities ? (
                    <div className="py-8 text-center">
                      <Loader2 className="h-6 w-6 mx-auto animate-spin text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Loading securities...</p>
                    </div>
                  ) : filteredSecurities.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">No securities found</p>
                    </div>
                  ) : filteredSecurities.map((security) => (
                    <div key={security.symbol} className="grid grid-cols-6 px-4 py-3">
                      <div className="font-medium">{security.symbol}</div>
                      <div className="col-span-2">{security.name}</div>
                      <div className="text-right">${security.price.toFixed(2)}</div>
                      <div className={`text-right flex items-center justify-end ${
                        security.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {security.change >= 0 ? (
                          <ChevronUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(security.change).toFixed(2)} ({Math.abs(security.changePercent).toFixed(2)}%)
                      </div>
                      <div className="text-right text-muted-foreground">
                        {(security.volume / 1000000).toFixed(2)}M
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Form */}
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="market" onValueChange={setOrderType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="limit">Limit</TabsTrigger>
                </TabsList>
                
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant={action === "buy" ? "default" : "outline"}
                      className={action === "buy" ? "bg-green-600 hover:bg-green-700" : ""}
                      onClick={() => setAction("buy")}
                    >
                      Buy
                    </Button>
                    <Button 
                      variant={action === "sell" ? "default" : "outline"}
                      className={action === "sell" ? "bg-red-600 hover:bg-red-700" : ""}
                      onClick={() => setAction("sell")}
                    >
                      Sell
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Symbol</label>
                    <Select value={symbol} onValueChange={setSymbol}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select symbol" />
                      </SelectTrigger>
                      <SelectContent>
                        {securities.map((security) => (
                          <SelectItem key={security.symbol} value={security.symbol}>
                            {security.symbol} - {security.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <Input 
                      type="number" 
                      placeholder="Enter quantity" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  {orderType === "limit" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Limit Price</label>
                      <Input 
                        type="number" 
                        placeholder="Enter price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowDownUp className="mr-2 h-4 w-4" />
                    )}
                    {action === "buy" ? "Buy" : "Sell"} {symbol || "Securities"}
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Order History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sortedTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent orders to display
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b px-4 py-2 font-medium">
                  <div>Type</div>
                  <div>Symbol</div>
                  <div>Quantity</div>
                  <div className="text-right">Price</div>
                  <div className="text-right">Total</div>
                  <div className="text-right">Date</div>
                </div>
                <div className="divide-y">
                  {sortedTransactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-6 px-4 py-3">
                      <div className={`font-medium ${
                        transaction.transaction_type === 'buy' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.transaction_type.toUpperCase()}
                      </div>
                      <div>{transaction.security_symbol}</div>
                      <div>{transaction.quantity}</div>
                      <div className="text-right">${transaction.price.toFixed(2)}</div>
                      <div className="text-right">${transaction.total_amount.toFixed(2)}</div>
                      <div className="text-right text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
