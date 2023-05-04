import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { OrderService } from '../order.service';
import { Order } from '../models/Order';
import { Router } from '@angular/router';
import { Product } from '../models/Product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  constructor(private userService: UserService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.updateOrders()
  }

  get loggedUser() {
    return this.userService.loggedUser!
 }

  orders: Order[] = []
  updateOrders() {
    return this.orderService.orders().then(
      value => {this.orders = value.filter(value => value.username === this.loggedUser.username)}
    )
  }


 removeItem(productId: number) {
  let user = this.loggedUser;
  if(user != null) {
    let index = user.shoppingCart.findIndex(
      value => value.id == productId
    )
    user.shoppingCart.splice(index,1)
    this.userService.updateLoggedUserShoppingCart(user.shoppingCart)
  }
 }

 get price() {
  return (this.loggedUser.shoppingCart == null) ? 0 : this.userService.loggedUser?.shoppingCart.reduce((sum, current) => sum + current.price, 0)!
  }

  priceFunction(products: Product[]) {
    return products.reduce((sum, current) => sum + current.price, 0)
  }

  placeOrder() {
    this.orderService.addOrder(this.loggedUser.username, this.loggedUser.shoppingCart)
    this.router.navigate([''])
  }

  clearShoppingCart() {
    this.userService.updateLoggedUserShoppingCart([]).then(
      value => console.log(value)
    )
  }

}
