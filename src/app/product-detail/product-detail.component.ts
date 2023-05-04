import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_PRODUCT, Product } from '../models/Product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  constructor(private route: ActivatedRoute, private productService: ProductService, private userService: UserService) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.products().then(
      value => {
        this.product = value[id]
      }
    )
  }
  errorMessage = ''
  product: Product = DEFAULT_PRODUCT

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
