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
import { useState } from "react";
import { Download, FileText, Filter, TrendingUp, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fundManagementService } from "@/services/fundManagementService";

// Report interface
interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  status: "Final" | "Draft";
  portfolioId?: string;
}

// Mock reports data
const MOCK_REPORTS: Report[] = [
  {
    id: "1",
    name: "Q1 2024 Investment Performance",
    type: "Performance",
    date: "2024-03-31",
    status: "Final"
  },
  {
    id: "2",
    name: "Portfolio Allocation Analysis",
    type: "Allocation",
    date: "2024-02-15",
    status: "Final"
  },
  {
    id: "3",
    name: "Risk Assessment Report",
    type: "Risk",
    date: "2024-01-20",
    status: "Final"
  },
  {
    id: "4",
    name: "Q2 2024 Investment Forecast",
    type: "Forecast",
    date: "2024-04-05",
    status: "Draft"
  }
];

export default function InvestmentReports() {
  const [reportType, setReportType] = useState<string>("all");

  // Fetch portfolios to generate portfolio-specific reports
  const { data: portfolios = [], isLoading: isLoadingPortfolios } = useQuery({
    queryKey: ['portfolios'],
    queryFn: () => fundManagementService.getPortfolios()
  });

  // Generate dynamic reports based on portfolios
  const portfolioReports: Report[] = portfolios.map((portfolio, index) => ({
    id: `portfolio-${portfolio.id}`,
    name: `${portfolio.name} Performance Report`,
    type: "Portfolio",
    date: new Date().toISOString().split('T')[0],
    status: "Final",
    portfolioId: portfolio.id
  }));

  // Combine mock reports with portfolio-specific reports
  const allReports = [...MOCK_REPORTS, ...portfolioReports];

  // Filter reports based on selected type
  const filteredReports = reportType === "all" 
    ? allReports 
    : allReports.filter(report => report.type.toLowerCase() === reportType.toLowerCase());

  // Handle report generation
  const handleGenerateReport = async () => {
    // In a real app, this would generate a new report
    console.log("Generating new report...");
  };

  // Handle report download
  const handleDownloadReport = (reportId: string) => {
    // In a real app, this would download the report
    console.log(`Downloading report ${reportId}...`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Investment Reports" 
          description="Access and manage your investment reports"
        />

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="allocation">Allocation</SelectItem>
                  <SelectItem value="risk">Risk</SelectItem>
                  <SelectItem value="forecast">Forecast</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <Button onClick={handleGenerateReport}>
                <FileText className="mr-2 h-4 w-4" />
                Generate New Report
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingPortfolios ? (
                  <div className="py-8 text-center">
                    <Loader2 className="h-6 w-6 mx-auto animate-spin text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Loading reports...</p>
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No reports found</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.status === "Final" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {report.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No scheduled reports configured
                </div>
                <div className="flex justify-center">
                  <Button>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Schedule New Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
