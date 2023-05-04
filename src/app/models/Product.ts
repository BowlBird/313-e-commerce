export interface Product {
	id: number,
	title: string,
	description: string,
	category: string,
	image: string,
	price: number,
	rating: Rating
}

export interface Rating {
	count: number,
	rate: number
}

export let DEFAULT_PRODUCT: Product = { 
	id: -1,
	title: '',
	description: '',
	category: '',
	image: '',
	price: 0,
	rating: {
		count: 0,
		rate: 0,
	}
}