import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Product, Rating } from './models/Product';
import { User } from './models/User';
import { map } from 'rxjs';
import { ProductService } from './product.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}
  title = 'e-commerce';
}
