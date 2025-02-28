
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { CommercialMetrics } from "./components/CommercialMetrics";
import { FinancialHighlights } from "./components/FinancialHighlights";
import { EnterpriseServices } from "./components/EnterpriseServices";
import { AreaMetrics } from "./components/AreaMetrics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, ChartBar, Database, FileText, ChartPie, Brain, LineChart, Wallet, Globe, ShieldCheck, FileBarChart, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CommercialDashboard() {
  const navigate = useNavigate();
  const monthlyData = [
    { month: "September", earning: 1820000, spending: 480000 },
    { month: "October", earning: 1950000, spending: 510000 },
    { month: "November", earning: 2010000, spending: 530000 },
    { month: "December", earning: 2150000, spending: 539200 },
    { month: "January", earning: 2280000, spending: 545000 },
    { month: "February", earning: 2410000, spending: 560000 },
  ];

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  const demoModules = [
    {
      title: "Treasury & Cash Management",
      icon: Wallet,
      description: "Control integral de liquidez, FX y análisis de cash flow",
      features: ["Cash Flow Analysis", "Transaction Management", "FX Operations"],
      path: "/commercial/treasury/dashboard"
    },
    {
      title: "Analysis & Forecasting",
      icon: ChartBar,
      description: "Forecasting predictivo y análisis de tendencias en tiempo real",
      features: ["Machine Learning Models", "Predictive Analysis", "Trend Visualization"],
      path: "/commercial/analytics/dashboard"
    },
    {
      title: "Data Automation & Integration",
      icon: Database,
      description: "Integración multi-banco y actualización automática de datos",
      features: ["Multi-bank Integration", "Real-time Updates", "Data Normalization"],
      path: "/commercial/operations/accounts"
    },
    {
      title: "Investment Management",
      icon: Landmark,
      description: "Gestión y análisis de portafolios de inversión",
      features: ["Portfolio Analysis", "Investment Opportunities", "Performance Tracking"],
      path: "/commercial/fund-management/dashboard"
    },
    {
      title: "Risk Management",
      icon: ShieldCheck,
      description: "Evaluación y gestión integral de riesgos financieros",
      features: ["Risk Assessment", "Compliance Reporting", "Market Risk Analysis"],
      path: "/commercial/risk-management"
    },
    {
      title: "Payment Processing",
      icon: Globe,
      description: "Gestión de pagos ACH, wire y RTP con nuestra API",
      features: ["Real-time Payments", "ACH Processing", "Cross-border Transfers"],
      path: "/commercial/payment-processor"
    },
    {
      title: "Entity Management",
      icon: FileBarChart,
      description: "Consolidación de datos financieros por subsidiarias",
      features: ["Subsidiary Management", "Custom Metadata", "Relationship Mapping"],
      path: "/commercial/operations/accounts"
    },
    {
      title: "AI Insights",
      icon: Brain,
      description: "Análisis de cash flow e inversiones con inteligencia artificial",
      features: ["Natural Language Processing", "Cash Insights", "AI Recommendations"],
      path: "/commercial/fund-management/portfolios/ai"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Commercial Banking Portal</h1>
            <Badge variant="outline" className="flex items-center gap-1">
              <Info className="h-3.5 w-3.5" />
              <span>Demo Data</span>
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Comprehensive overview of your enterprise operations
          </p>
        </div>

        <div className="grid gap-6">
          <section className="fade-in">
            <div className="flex items-center gap-2 mb-4">
              <ChartPie className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
              <Badge variant="outline" size="sm" className="ml-2">Demo</Badge>
            </div>
            <div className="grid gap-4">
              <CommercialMetrics />
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="fade-in animation-delay-100">
                <div className="flex items-center gap-2 mb-4">
                  <LineChart className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Financial Analytics</h2>
                  <Badge variant="outline" size="sm" className="ml-2">Demo</Badge>
                </div>
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-lg">
                  <StatisticsCards 
                    currentEarning={currentEarning}
                    previousEarning={previousEarning}
                    currentSpending={currentSpending}
                    previousSpending={previousSpending}
                  />
                </Card>
              </div>

              <div className="fade-in animation-delay-200">
                <div className="flex items-center gap-2 mb-4">
                  <ChartPie className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Area Performance</h2>
                  <Badge variant="outline" size="sm" className="ml-2">Demo</Badge>
                </div>
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-lg p-6">
                  <AreaMetrics />
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="fade-in animation-delay-150">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Financial Highlights</h2>
                  <Badge variant="outline" size="sm" className="ml-2">Demo</Badge>
                </div>
                <FinancialHighlights />
              </div>

              <div className="fade-in animation-delay-250">
                <div className="flex items-center gap-2 mb-4">
                  <ChartBar className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Monthly Trends</h2>
                  <Badge variant="outline" size="sm" className="ml-2">Demo</Badge>
                </div>
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-lg">
                  <StatisticsChart monthlyData={monthlyData} />
                </Card>
              </div>
            </div>
          </section>

          <section className="fade-in animation-delay-300">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">DataCloud AI Features</h2>
              <Badge variant="outline" size="sm" className="ml-2">Demo</Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {demoModules.map((module, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <module.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline" size="sm">Demo</Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 mb-4">
                      {module.features.map((feature, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/70"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(module.path)}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="fade-in animation-delay-300">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Enterprise Services</h2>
              <Badge variant="outline" size="sm" className="ml-2">Demo</Badge>
            </div>
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-lg p-6">
              <EnterpriseServices />
            </Card>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
