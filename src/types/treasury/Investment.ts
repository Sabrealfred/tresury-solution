export interface Investment {
  id: string;
  accountId: string;
  name: string;
  type: string;
  description?: string;
  holdings: InvestmentHolding[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestmentHolding {
  asset: string;
  quantity: number;
  price: number;
}
