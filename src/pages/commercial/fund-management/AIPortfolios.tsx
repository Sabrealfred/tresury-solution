import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Zap, 
  Shield, 
  Lightbulb, 
  RefreshCw, 
  ChevronRight, 
  ArrowRight, 
  Check, 
  Clock, 
  Loader2,
  Eye
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fundManagementService } from "@/services/fundManagementService";
import { Portfolio } from "@/services/fundManagementService";
import { useToast } from "@/components/ui/use-toast";

// Extended portfolio interface with UI-specific properties
interface AIPortfolio extends Portfolio {
  riskScore: number;
  timeHorizon: string;
}

export default function AIPortfolios() {
  const [selectedRisk, setSelectedRisk] = useState<number>(5);
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState<string>("medium");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [investmentGoal, setInvestmentGoal] = useState<string>("");
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch portfolios
  const { data: portfoliosData = [], isLoading } = useQuery({
    queryKey: ['portfolios'],
    queryFn: () => fundManagementService.getPortfolios()
  });

  // Transform portfolios to AIPortfolios with additional properties
  const portfolios: AIPortfolio[] = portfoliosData
    .filter(p => p.name.includes("AI") || p.description.includes("AI"))
    .map(portfolio => {
      // Determine risk score based on risk_level
      let riskScore = 5;
      if (portfolio.risk_level === "Very High") riskScore = 9;
      else if (portfolio.risk_level === "High") riskScore = 8;
      else if (portfolio.risk_level === "Medium") riskScore = 5;
      else if (portfolio.risk_level === "Low") riskScore = 3;
      else if (portfolio.risk_level === "Very Low") riskScore = 1;
      
      // Determine time horizon based on portfolio type
      let timeHorizon = "medium";
      if (portfolio.type === "growth") timeHorizon = "long";
      else if (portfolio.type === "income") timeHorizon = "medium";
      else if (portfolio.type === "conservative") timeHorizon = "short";
      
      return {
        ...portfolio,
        riskScore,
        timeHorizon,
      };
    });

  // Generate AI portfolio mutation
  const generatePortfolioMutation = useMutation({
    mutationFn: (params: {
      risk_level: number;
      investment_goal: string;
      time_horizon: string;
      initial_investment: number;
    }) => fundManagementService.generateAIPortfolio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast({
        title: "Portfolio Generated",
        description: "Your AI portfolio has been generated successfully.",
      });
      setIsGenerating(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to generate portfolio: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  });

  const activePortfolios = portfolios.filter(p => p.status === "active");
  const recommendedPortfolios = portfolios.filter(p => p.status === "recommended");

  const handleGeneratePortfolio = () => {
    if (!investmentGoal) {
      toast({
        title: "Missing Information",
        description: "Please select an investment goal",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Convert risk level to appropriate format
    let riskLevel = selectedRisk;
    
    // Convert time horizon to appropriate format
    let timeHorizon = selectedTimeHorizon;
    
    // Generate portfolio
    generatePortfolioMutation.mutate({
      risk_level: riskLevel,
      investment_goal: investmentGoal,
      time_horizon: timeHorizon,
      initial_investment: initialInvestment
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="AI Portfolio Management" 
          description="AI-powered portfolio recommendations and optimization"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                AI Portfolio Generator
              </CardTitle>
              <CardDescription>
                Create a personalized investment portfolio using our advanced AI algorithms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                  <span className="text-sm font-medium">
                    {selectedRisk <= 3 ? "Low" : 
                     selectedRisk <= 6 ? "Medium" : 
                     selectedRisk <= 8 ? "High" : "Very High"}
                  </span>
                </div>
                <Slider
                  id="risk-tolerance"
                  min={1}
                  max={10}
                  step={1}
                  value={[selectedRisk]}
                  onValueChange={(value) => setSelectedRisk(value[0])}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment-goal">Investment Goal</Label>
              <Select 
                value={investmentGoal} 
                onValueChange={setInvestmentGoal}
              >
                <SelectTrigger id="investment-goal">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="preservation">Capital Preservation</SelectItem>
                </SelectContent>
              </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-horizon">Time Horizon</Label>
                <Select value={selectedTimeHorizon} onValueChange={setSelectedTimeHorizon}>
                  <SelectTrigger id="time-horizon">
                    <SelectValue placeholder="Select time horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short Term (1-3 years)</SelectItem>
                    <SelectItem value="medium">Medium Term (3-7 years)</SelectItem>
                    <SelectItem value="long">Long Term (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initial-investment">Initial Investment ($)</Label>
                <Input 
                  id="initial-investment" 
                  type="number" 
                  placeholder="Enter amount" 
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(parseInt(e.target.value) || 0)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleGeneratePortfolio}
                disabled={isGenerating}
              >
                {isGenerating || generatePortfolioMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Portfolio...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate AI Portfolio
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Portfolio Benefits</CardTitle>
              <CardDescription>
                How our AI-powered portfolios can enhance your investment strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Optimized Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    AI algorithms analyze thousands of data points to optimize for better risk-adjusted returns
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Risk Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced risk modeling helps protect your investments during market volatility
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Continuous Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Portfolios are continuously monitored and rebalanced based on market conditions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">Personalized Strategy</h3>
                  <p className="text-sm text-muted-foreground">
                    Tailored to your specific goals, risk tolerance, and investment timeline
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active AI Portfolios</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid md:grid-cols-2 gap-6">
              {isLoading ? (
                <Card className="md:col-span-2">
                  <CardContent className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </CardContent>
                </Card>
              ) : activePortfolios.length > 0 ? (
                activePortfolios.map((portfolio) => (
                  <Card key={portfolio.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{portfolio.name}</CardTitle>
                          <CardDescription>{portfolio.description}</CardDescription>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Brain className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Expected Return</p>
                          <p className="text-lg font-bold text-green-600">+{portfolio.expected_return}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Risk Level</p>
                          <p className="text-lg font-bold">{portfolio.risk_level}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Time Horizon</p>
                          <p className="text-lg font-bold capitalize">
                            {portfolio.timeHorizon === "short" ? "Short Term" :
                             portfolio.timeHorizon === "medium" ? "Medium Term" :
                             "Long Term"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="text-lg font-bold">{new Date(portfolio.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Asset Allocation</p>
                        <div className="space-y-2">
                          {Object.entries(portfolio.allocation).map(([asset, percentage]) => (
                            <div key={asset} className="flex items-center justify-between">
                              <span className="text-sm">{asset}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">
                        <PieChart className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Rebalance
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>No Active AI Portfolios</CardTitle>
                    <CardDescription>
                      You don't have any active AI portfolios yet. Generate a new portfolio or activate a recommended one.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-8">
                    <Button>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate New Portfolio
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="grid md:grid-cols-2 gap-6">
              {isLoading ? (
                <Card className="md:col-span-2">
                  <CardContent className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </CardContent>
                </Card>
              ) : recommendedPortfolios.length > 0 ? (
                recommendedPortfolios.map((portfolio) => (
                  <Card key={portfolio.id} className="border-dashed">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{portfolio.name}</CardTitle>
                          <CardDescription>{portfolio.description}</CardDescription>
                        </div>
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Lightbulb className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Expected Return</p>
                          <p className="text-lg font-bold text-green-600">+{portfolio.expected_return}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Risk Level</p>
                          <p className="text-lg font-bold">{portfolio.risk_level}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Time Horizon</p>
                          <p className="text-lg font-bold capitalize">
                            {portfolio.timeHorizon === "short" ? "Short Term" :
                             portfolio.timeHorizon === "medium" ? "Medium Term" :
                             "Long Term"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Recommended</p>
                          <p className="text-lg font-bold">{new Date(portfolio.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Asset Allocation</p>
                        <div className="space-y-2">
                          {Object.entries(portfolio.allocation).map(([asset, percentage]) => (
                            <div key={asset} className="flex items-center justify-between">
                              <span className="text-sm">{asset}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-amber-500 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button>
                        <Check className="h-4 w-4 mr-2" />
                        Activate Portfolio
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>No Recommended Portfolios</CardTitle>
                    <CardDescription>
                      You don't have any AI portfolio recommendations yet. Generate a new portfolio to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-8">
                    <Button>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate New Portfolio
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>AI Portfolio Performance</CardTitle>
                <CardDescription>
                  Historical performance analysis of your AI-managed portfolios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Performance Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Performance visualization and analytics would appear here
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
