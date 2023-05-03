import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Product, Rating } from './models/Product';
import { User } from './models/User';
import { map } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private productService: ProductService) {}
  ngOnInit() {

    let user: User = {
      username: 'Carson5',
      password: 'CM123',
      shoppingCart: []
    }

    this.userService.addUser(user)


  }
  title = 'e-commerce';
}
