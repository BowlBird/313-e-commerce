import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { lastValueFrom, firstValueFrom, map, Observable, of } from 'rxjs';
import { Product } from './models/Product';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = '/users'
  private _loggedUser: User | null = null;

  constructor(private databaseService: DatabaseService) {}
  
  // === LOGIN LOGIC ===
  get loggedUser() {
    return this._loggedUser
  }

  /**
   * will return false if login failed
   */
  // async login(username: string, password: string): Promise<boolean> {
  //   let result = (await firstValueFrom(this.users)).filter(value =>
  //     value.username === username
  //   ).filter(value =>
  //     value.password === password
  //   )

  //   // early return if username and password didn't work
  //   if (result.length != 1) {
  //     return false
  //   }
  //   //login user
  //   this._loggedUser = result[0];
  //   return true;
  // }

  logout() {
    this._loggedUser = null
  }

  // === DATABASE LOGIC ===

  /**
   * will return false if no add happened.
   * @param user 
   */
  async addUser(user: User): Promise<boolean> {
    return this.databaseService.post(this.path, user.username, user)
  }

  private get users() {
    return this.databaseService.get(this.path)
  }

  // async updateLoggedUserShoppingCart(shoppingCart: Product[]): Promise<boolean> {
  //   let user = this.loggedUser
  //   if (user == null) return false
  //   user.shoppingCart = shoppingCart
  //   this.http.put(this.dbPath + '.json', user )
  //   return true
  // }

}
