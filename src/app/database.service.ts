import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbPath = 'https://e-commerce-2956f-default-rtdb.firebaseio.com'
  private extension = '.json'

  constructor(private http: HttpClient) {}

  /**
   * creates new object in the database
   */
  async post(path: string, key: string, data: Object): Promise<boolean> {

    //check if object exists
    let getTest = await this.get(path, key)
    if(getTest != null) return false

    this.http.put(`${this.dbPath}${path}/${key}${this.extension}`, data).subscribe();
    return true
  }

  /**
   * updates object in the database
   */
  async put(path: string, key: string, data: Object): Promise<boolean> {
    
    //check if object exists
    let getTest = await this.get(path, key)
    if(getTest == null) return false

    this.http.put(`${this.dbPath}${path}/${key}${this.extension}`, data).subscribe();
    return true
  }

  /**
   * deletes object from the database
   */
  async delete(path: string, key: string): Promise<boolean> {
    //check if object exists
    let getTest = await this.get(`${path}/${key}`)
    if(getTest == null) return false

    this.http.delete(`${this.dbPath}${path}/${key}${this.extension}`).subscribe();
    return true
  }

  /**
   * gets object from the database
   * 
   * for one object, must specify key in path.
   */
   async get(path: string, key?: string): Promise<Object> {
    let result = await firstValueFrom(this.http.get(
      `${this.dbPath}${path}${(key == undefined) ? '' : '/' + key}${this.extension}`
      ))
    return result
  }

}
