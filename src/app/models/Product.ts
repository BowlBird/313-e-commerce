export interface Product {
	id: number,
	title: string,
	description: string,
	category: string,
	imageUrl: string,
	price: number,
	rating: Rating
}

export interface Rating {
	count: number,
	rate: number
}