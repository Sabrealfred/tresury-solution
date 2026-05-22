export interface FxRate {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
