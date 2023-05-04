import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  username: string = ""
  password: string = ""

  errorMessage: string = ""
  successMessage: string = ""

  login() {
    this.userService.login(this.username, this.password).then(
      result => {
        if(result) {
          this.router.navigate([''])
        } else {
          this.errorMessage = 'failed to login. Incorrect username or password.'
        }
      }
    )
  }

  createAccount() {
    let user: User = {
      username: this.username,
      password: this.password,
      shoppingCart: [],
    }
    this.userService.addUser(user).then(
      result => {
        if(!result) {
          this.errorMessage = 'failed to create account. Username taken.'
        }else {
          this.successMessage = 'Successfully created account! Please log in.'
        }

      }
    )
  }


}
