export interface createProductPayload {
  name: string;
  summary?: string;
  description: string;
  quantity: number;
  price: number;
  category?: string;
}

export interface updateProductPayload {
  name?: string;
  summary?: string;
  description?: string;
  quantity?: number;
  price?: number;
  category?: string;
}

export enum ProductAction {
  APPROVE = 'Approve',
  DISAPPROVE = 'Disapprove',
}

export interface updateProductStatusPayload {
  action: ProductAction;
}
