export interface Bill {
  billId: number;
  flatTenancyId: number;
  receiverId: string;
  receiverName: string;
  amount: number;
  billTypeId: number;
  billType: string;
  paymentMethodId: number;
  paymentMethod: string;
  paymentDate: Date;
  createdDate: Date;
  comments?: string;
}

export type BillForm = Pick<
  Bill,
  | 'flatTenancyId'
  | 'receiverId'
  | 'amount'
  | 'billTypeId'
  | 'paymentMethodId'
  | 'paymentDate'
  | 'comments'
>;
