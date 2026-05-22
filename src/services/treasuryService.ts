import { Transaction } from "@/types/treasury/Transaction";

export async function getTransactions(accountId: string): Promise<Transaction[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const transactions: Transaction[] = [
    {
      id: "1",
      accountId: accountId,
      date: new Date("2024-02-20"),
      description: "International Wire Transfer",
      amount: 50000,
      currency: "USD",
      baiCode: "278",
      bankName: "Bank of America",
      type: "debit",
      category: "Wire Transfer",
      tags: ["international", "wire"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      accountId: accountId,
      date: new Date("2024-02-19"),
      description: "Corporate Payment",
      amount: 75000,
      currency: "USD",
      baiCode: "100",
      bankName: "Chase",
      type: "credit",
      category: "Payment",
      tags: ["corporate", "payment"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      accountId: accountId,
      date: new Date("2024-02-18"),
      description: "Supplier Invoice",
      amount: 25000,
      currency: "USD",
      baiCode: "300",
      bankName: "Wells Fargo",
      type: "debit",
      category: "Invoice",
      tags: ["supplier", "invoice"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      accountId: accountId,
      date: new Date("2024-02-17"),
      description: "Client Payment",
      amount: 100000,
      currency: "USD",
      baiCode: "100",
      bankName: "Citibank",
      type: "credit",
      category: "Payment",
      tags: ["client", "payment"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      accountId: accountId,
      date: new Date("2024-02-16"),
      description: "Payroll Processing",
      amount: 200000,
      currency: "USD",
      baiCode: "400",
      bankName: "PNC",
      type: "debit",
      category: "Payroll",
      tags: ["payroll", "processing"],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  return transactions;
}
