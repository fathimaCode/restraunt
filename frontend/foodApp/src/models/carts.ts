import { Product } from "./product";

export interface Carts{
    quantity:number;
    created_at:String;
    product: Product;
    subtotal:number;
    calories:number;
}