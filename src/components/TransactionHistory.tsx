
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Transaction {
  id: string;
  amount: number;
  transaction_type: string;
  status: string;
  created_at: string;
  currency: string;
  profile_id?: string;
  user_id?: string;
}

interface FormattedTransaction {
  id: string;
  name: string;
  amount: number;
  type: "received" | "sent" | "pending";
  date: string;
  avatar: string;
  description?: string;
}

export function TransactionHistory() {
  const { data: transactions, isLoading, error } = useQuery<FormattedTransaction[]>({
    queryKey: ["recent-transactions"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.id) {
        throw new Error("No authenticated user found");
      }

      const { data, error } = await supabase
        .from("transactions")
        .select("*, profiles:profile_id(first_name, last_name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      // Format transactions for display
      return (data as any[]).map((transaction: any): FormattedTransaction => {
        const profile = transaction.profiles;
        const isReceived = transaction.transaction_type === "deposit" || 
                          (transaction.transaction_type === "transfer" && transaction.amount > 0);
        
        let name = "Transacción";
        if (profile) {
          name = `${profile.first_name} ${profile.last_name}`;
        } else if (transaction.transaction_type === "payment") {
          name = "Pago";
        } else if (transaction.transaction_type === "deposit") {
          name = "Depósito";
        } else if (transaction.transaction_type === "withdrawal") {
          name = "Retiro";
        } else if (transaction.transaction_type === "transfer") {
          name = isReceived ? "Transferencia recibida" : "Transferencia enviada";
        }

        let type: "received" | "sent" | "pending" = "sent";
        if (isReceived) {
          type = "received";
        } else if (transaction.status === "pending") {
          type = "pending";
        }

        // Format date
        const date = new Date(transaction.created_at);
        const formattedDate = formatDistanceToNow(date, { 
          addSuffix: true,
          locale: es
        });

        return {
          id: transaction.id,
          name,
          amount: Math.abs(transaction.amount),
          type,
          date: formattedDate,
          avatar: "/placeholder.svg",
          description: transaction.transaction_type === "payment" ? 
            "Pago de servicio" : undefined
        };
      });
    },
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !transactions || transactions.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No hay transacciones recientes
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <img src={transaction.avatar} alt={transaction.name} />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{transaction.name}</p>
                <span className="text-xs text-muted-foreground">{transaction.date}</span>
              </div>
              {transaction.description && (
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${
              transaction.type === "received" ? "text-accent" :
              transaction.type === "sent" ? "text-destructive" :
              "text-muted-foreground"
            }`}>
              {transaction.type === "received" ? "+" : "-"}
              ${transaction.amount.toFixed(2)}
            </p>
            {transaction.type === "pending" && (
              <Button size="sm" className="mt-1 h-8 rounded-full text-xs">
                Pay now
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
