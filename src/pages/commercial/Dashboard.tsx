
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { CommercialMetrics } from "./components/CommercialMetrics";
import { FinancialHighlights } from "./components/FinancialHighlights";
import { EnterpriseServices } from "./components/EnterpriseServices";
import { AreaMetrics } from "./components/AreaMetrics";
import { Card } from "@/components/ui/card";

export default function CommercialDashboard() {
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

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Commercial Banking Portal</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive overview of your enterprise operations
          </p>
        </div>

        <div className="grid gap-6">
          <section className="fade-in">
            <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
            <div className="grid gap-4">
              <CommercialMetrics />
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="fade-in animation-delay-100">
                <h2 className="text-xl font-semibold mb-4">Financial Analytics</h2>
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
                <h2 className="text-xl font-semibold mb-4">Area Performance</h2>
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-lg p-6">
                  <AreaMetrics />
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="fade-in animation-delay-150">
                <h2 className="text-xl font-semibold mb-4">Financial Highlights</h2>
                <FinancialHighlights />
              </div>

              <div className="fade-in animation-delay-250">
                <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
                <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-lg">
                  <StatisticsChart monthlyData={monthlyData} />
                </Card>
              </div>
            </div>
          </section>

          <section className="fade-in animation-delay-300">
            <h2 className="text-xl font-semibold mb-4">Enterprise Services</h2>
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-lg p-6">
              <EnterpriseServices />
            </Card>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
