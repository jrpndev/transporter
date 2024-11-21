import { Products } from "../../products/types";

export type Order = {
  id: number;
  supplierName: string;
  products: Products[]
  totalValue: number;
  status: string;
  orderDate: string;

};
