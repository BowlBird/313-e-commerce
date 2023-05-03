import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService) {}
    
  title = 'e-commerce';
}
