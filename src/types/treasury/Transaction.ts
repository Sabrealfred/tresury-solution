export interface Transaction {
  id: string;
  accountId: string;
  date: Date;
  description: string;
  amount: number;
  currency: string;
  baiCode?: string;
  bankName?: string;
  type: 'credit' | 'debit';
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
