export interface Account {
  id: string;
  entityId: string;
  name: string;
  type: 'bank' | 'investment';
  currency: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
