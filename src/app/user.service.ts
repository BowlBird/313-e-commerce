import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { lastValueFrom, firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = "https://e-commerce-2956f-default-rtdb.firebaseio.com/users"

  constructor(private http: HttpClient) {}
  
  get users() {
    return this.http.get<User[]>(this.dbPath + '.json').pipe(
      map(data => {
        let users: User[] = [];

        for(let key in data) {
          users.push(data[key])
        }
        return users;
        })
    )
  }

  /**
   * if user id = 0, id will be auto generated.
   * will return false if no add happened.
   * @param user 
   */
  async addUser(user: User): Promise<boolean> {

    //generate id
    if(user.id == 0) {
      user.id = await this.generateId()
    }

    
    let users = await firstValueFrom(this.users)
    let usersIds = users.map(function (value) {return value.id})
    let usersUsernames = users.map(function (value) {return value.username})
    
    //test if it should add or not
    if (user.id in usersIds || user.username in usersUsernames) {
      return false
    }

    this.http.post(this.dbPath + '.json', user).subscribe();

    return true
  }

  /**
   * generates id not currently being used.
   * @returns id
   */
  private async generateId(): Promise<number> {
    let currentIds = (await firstValueFrom(this.users)).map(function (value) {return value.id});
    
    let id = 1;
    while(true) {
      if (!currentIds.includes(id)) {
        return id
      }
      id++
    }
  }

}
