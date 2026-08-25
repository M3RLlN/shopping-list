export interface Item {
  id: string;
  label: string;
  amount?: number;
  unit?: string;
  bought: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemInput {
  label: string;
  amount?: number;
  unit?: string;
}

export interface UpdateItemInput {
  label?: string;
  amount?: number;
  unit?: string;
  bought?: boolean;
}
