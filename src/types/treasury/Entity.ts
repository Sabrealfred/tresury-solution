export interface Entity {
  id: string;
  name: string;
  type: 'subsidiary' | 'division' | 'region';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
