import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private userService: UserService) {}
  ngOnInit() {}
  get loggedUser() {
     return this.userService.loggedUser
  }

  get shoppingCart() {
    return (this.loggedUser?.shoppingCart == null) ? [] : this.loggedUser.shoppingCart
  }

  get price() {
    return (this.loggedUser?.shoppingCart == null) ? 0 : this.userService.loggedUser?.shoppingCart.reduce((sum, current) => sum + current.price, 0)!
  }
}
