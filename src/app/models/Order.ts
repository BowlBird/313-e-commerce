import { Product } from "./Product";

export interface Order {
	id: number,
	username: string,
	shoppingCart: Product[],
	date: Date,
}