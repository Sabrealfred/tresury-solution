import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { 
  BarChart3, 
  PieChart, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  Minus 
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { fundManagementService } from "@/services/fundManagementService";
import { Portfolio } from "@/services/fundManagementService";
import { useToast } from "@/components/ui/use-toast";

// Extended portfolio interface with UI-specific properties
interface PortfolioWithUIData extends Portfolio {
  value: number;
  change: number;
  holdings: number;
}

export default function Portfolios() {
  const [portfolioType, setPortfolioType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [newPortfolio, setNewPortfolio] = useState({
    name: "",
    type: "",
    risk_level: "",
    initial_investment: 0
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch portfolios data
  const { data: portfoliosData = [], isLoading } = useQuery({
    queryKey: ['portfolios'],
    queryFn: () => fundManagementService.getPortfolios()
  });

  // Transform portfolios data to include UI-specific properties
  const portfolios: PortfolioWithUIData[] = portfoliosData.map(portfolio => {
    // Calculate portfolio value based on allocation percentages and a base value
    const baseValue = portfolio.id === "1" ? 1500000 : 
                      portfolio.id === "2" ? 750000 : 
                      portfolio.id === "3" ? 200000 : 
                      portfolio.id === "4" ? 350000 : 
                      portfolio.id === "5" ? 180000 : 500000;
    
    // Calculate number of holdings based on allocation object keys
    const holdings = Object.keys(portfolio.allocation).length;
    
    return {
      ...portfolio,
      value: baseValue,
      change: portfolio.expected_return / 4, // Quarterly change (mock data)
      holdings
    };
  });

  // Create portfolio mutation
  const createPortfolioMutation = useMutation({
    mutationFn: (newPortfolio: {
      name: string;
      type: string;
      risk_level: string;
      expected_return: number;
      allocation: Record<string, number>;
      description: string;
      status: "active" | "recommended" | "archived";
    }) => fundManagementService.createPortfolio(newPortfolio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast({
        title: "Portfolio Created",
        description: "Your new portfolio has been created successfully.",
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create portfolio: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  // Handle form submission
  const handleCreatePortfolio = () => {
    if (!newPortfolio.name || !newPortfolio.type || !newPortfolio.risk_level) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Generate allocation based on portfolio type and risk level
    let allocation: Record<string, number> = {};
    
    if (newPortfolio.type === "growth") {
      allocation = {
        "US Stocks": 50,
        "International Stocks": 25,
        "Emerging Markets": 15,
        "Bonds": 5,
        "Alternatives": 5
      };
    } else if (newPortfolio.type === "income") {
      allocation = {
        "Dividend Stocks": 30,
        "Bonds": 40,
        "REITs": 15,
        "Preferred Stocks": 10,
        "Cash": 5
      };
    } else if (newPortfolio.type === "balanced") {
      allocation = {
        "US Stocks": 35,
        "International Stocks": 15,
        "Bonds": 40,
        "Real Estate": 5,
        "Cash": 5
      };
    } else if (newPortfolio.type === "conservative") {
      allocation = {
        "Bonds": 60,
        "Dividend Stocks": 20,
        "Cash": 15,
        "Gold": 5
      };
    }

    // Calculate expected return based on type and risk level
    let expectedReturn = 0;
    if (newPortfolio.risk_level === "Very High") expectedReturn = 15;
    else if (newPortfolio.risk_level === "High") expectedReturn = 12;
    else if (newPortfolio.risk_level === "Medium") expectedReturn = 8;
    else if (newPortfolio.risk_level === "Low") expectedReturn = 5;
    else if (newPortfolio.risk_level === "Very Low") expectedReturn = 3;

    // Create portfolio
    createPortfolioMutation.mutate({
      name: newPortfolio.name,
      type: newPortfolio.type,
      risk_level: newPortfolio.risk_level,
      expected_return: expectedReturn,
      allocation,
      description: `${newPortfolio.type.charAt(0).toUpperCase() + newPortfolio.type.slice(1)} portfolio with ${newPortfolio.risk_level.toLowerCase()} risk level`,
      status: "active"
    });
  };

  // Reset form
  const resetForm = () => {
    setNewPortfolio({
      name: "",
      type: "",
      risk_level: "",
      initial_investment: 0
    });
  };

  // Filter portfolios based on type and search query
  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesType = portfolioType === "all" || portfolio.type === portfolioType;
    const matchesSearch = searchQuery === "" || 
      portfolio.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calculate total portfolio value
  const totalValue = portfolios.reduce((sum, portfolio) => sum + portfolio.value, 0);
  
  // Calculate average performance
  const averagePerformance = portfolios.length > 0 
    ? portfolios.reduce((sum, portfolio) => sum + portfolio.change, 0) / portfolios.length
    : 0;

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Investment Portfolios" 
          description="Manage and monitor your investment portfolios"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <BarChart3 className="h-3 w-3 mr-1" />
                <span>Across {portfolios.length} portfolios</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${averagePerformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {averagePerformance >= 0 ? '+' : ''}{averagePerformance.toFixed(2)}%
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                {averagePerformance >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span>Year to date</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolios.reduce((sum, portfolio) => sum + portfolio.holdings, 0)}
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <PieChart className="h-3 w-3 mr-1" />
                <span>Diversified assets</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-portfolios" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all-portfolios">All Portfolios</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search portfolios..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={portfolioType} onValueChange={setPortfolioType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="conservative">Conservative</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Portfolio
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Portfolio</DialogTitle>
                    <DialogDescription>
                      Create a new investment portfolio with your desired parameters.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Portfolio Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter portfolio name" 
                        value={newPortfolio.name}
                        onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="type">Portfolio Type</Label>
                      <Select 
                        value={newPortfolio.type}
                        onValueChange={(value) => setNewPortfolio({...newPortfolio, type: value})}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="growth">Growth</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="conservative">Conservative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="risk">Risk Level</Label>
                      <Select 
                        value={newPortfolio.risk_level}
                        onValueChange={(value) => setNewPortfolio({...newPortfolio, risk_level: value})}
                      >
                        <SelectTrigger id="risk">
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Very High">Very High</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Very Low">Very Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="initial-investment">Initial Investment ($)</Label>
                      <Input 
                        id="initial-investment" 
                        type="number" 
                        placeholder="Enter amount" 
                        value={newPortfolio.initial_investment || ''}
                        onChange={(e) => setNewPortfolio({...newPortfolio, initial_investment: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button 
                      onClick={handleCreatePortfolio}
                      disabled={createPortfolioMutation.isPending}
                    >
                      {createPortfolioMutation.isPending ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Creating...
                        </>
                      ) : (
                        'Create Portfolio'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <TabsContent value="all-portfolios">
            <Card>
              <CardHeader>
                <CardTitle>Your Investment Portfolios</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Performance</TableHead>
                      <TableHead className="text-right">Holdings</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredPortfolios.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No portfolios found
                        </TableCell>
                      </TableRow>
                    ) : filteredPortfolios.map((portfolio) => (
                      <TableRow key={portfolio.id}>
                        <TableCell className="font-medium">{portfolio.name}</TableCell>
                        <TableCell className="capitalize">{portfolio.type}</TableCell>
                        <TableCell>{portfolio.risk_level}</TableCell>
                        <TableCell className="text-right">${portfolio.value.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <span className={portfolio.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {portfolio.change >= 0 ? '+' : ''}{portfolio.change.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{portfolio.holdings}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Performance Chart</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Historical performance data visualization would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Allocation Chart</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Asset allocation visualization would appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
