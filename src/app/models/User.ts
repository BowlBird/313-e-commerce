import { Product } from "./Product";

export interface User {
	username: string,
	password: string,
	shoppingCart: Product[]
}