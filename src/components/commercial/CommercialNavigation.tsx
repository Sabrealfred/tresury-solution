
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  DollarSign,
  FileText,
  BarChart,
  Users,
  Globe,
  ShieldCheck,
  CreditCard,
  Briefcase,
  LayoutDashboard
} from "lucide-react";

export function CommercialNavigation() {
  const location = useLocation();
  
  const sections = [
    {
      title: "Treasury",
      items: [
        { name: "Dashboard", path: "/commercial/treasury", icon: LayoutDashboard },
        { name: "Cash Flow", path: "/commercial/treasury/cash-flow", icon: DollarSign },
        { name: "Transactions", path: "/commercial/treasury/transactions", icon: FileText },
        { name: "Investments", path: "/commercial/treasury/investments", icon: BarChart },
        { name: "FX Operations", path: "/commercial/treasury/fx", icon: Globe },
      ]
    },
    {
      title: "Operations",
      items: [
        { name: "Payroll", path: "/commercial/payroll", icon: Users },
        { name: "Invoices", path: "/commercial/invoices", icon: FileText },
        { name: "Expenses", path: "/commercial/expenses", icon: DollarSign },
        { name: "Trade Finance", path: "/commercial/trade-finance", icon: Globe },
        { name: "Risk Management", path: "/commercial/risk-management", icon: ShieldCheck },
        { name: "Payment Processor", path: "/commercial/payment-processor", icon: CreditCard },
      ]
    },
    {
      title: "Fund Management",
      items: [
        { name: "Dashboard", path: "/commercial/fund-management", icon: LayoutDashboard },
        { name: "Portfolios", path: "/commercial/fund-management/portfolios", icon: BarChart },
        { name: "AI Portfolios", path: "/commercial/fund-management/portfolios/ai", icon: BarChart },
      ]
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="space-y-8">
      {sections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="font-semibold text-lg text-muted-foreground">{section.title}</h3>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm h-9"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
