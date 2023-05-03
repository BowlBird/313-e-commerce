import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath = "https://e-commerce-2956f-default-rtdb.firebaseio.com/products"

  constructor(private http: HttpClient) {}

  get products(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dbPath + '.json')
  }
}
