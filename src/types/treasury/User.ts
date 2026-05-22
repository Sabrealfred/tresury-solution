export interface User {
  id: string;
  entityId: string;
  role: 'admin' | 'user';
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}
