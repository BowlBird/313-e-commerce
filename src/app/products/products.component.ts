import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/Product';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productService: ProductService, private userService: UserService) {}
  ngOnInit() {
    this.productService.products().then(
      value => this.products = value
    )
  }
  products: Product[] = []
  errorMessage: string =''
  search: string = ''

  updateProducts() {
    this.productService.products().then(
      value => {
        this.products = value.filter(
          product => product.title.includes(this.search)
        )
      }
    )
  }

  addToCart(product: Product) {
    console.log(product);
    let user = this.userService.loggedUser
    if(user == null) 
      this.errorMessage = 'Please log in to add to cart.'
    else {
      let shoppingCart = (user.shoppingCart == null) ? [] : user.shoppingCart 
      shoppingCart.push(product)
      this.userService.updateLoggedUserShoppingCart(
        shoppingCart
      )
    }
  }
}
