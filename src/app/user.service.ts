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
  async login(username: string, password: string): Promise<boolean> {
    let result = await this.users().then(value => {
      return value.filter( user =>
        username === user.username
      ).filter( user =>
        password === user.password
      )
    }
    )

    // early return if username and password didn't work
    if (result.length != 1) {
      return false
    }

    //login user
    this._loggedUser = result[0];

    return true;
  }
  /**
   * logs user out
   */
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

  /**
   * gets all users
   */
  async users(): Promise<User[]> {
    let object = await this.databaseService.get(this.path)
    let users: User[] = [];
    for(let key in object) {
      users.push(object[key as keyof typeof object] as unknown as User)
    }
    return users
  }

  /**
   * 
   * @param shoppingCart 
   * @returns whether function worked
   */
  async updateLoggedUserShoppingCart(shoppingCart: Product[]): Promise<boolean> {
    let user = this.loggedUser
    if (user == null) return false
    user.shoppingCart = shoppingCart
    this.databaseService.put(this.path, user.username, user)
    return true
  }

}
