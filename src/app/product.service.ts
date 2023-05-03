import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './models/Product';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath = "https://e-commerce-2956f-default-rtdb.firebaseio.com/products"

  constructor(private databaseService: DatabaseService) {}

  /**
   * getter for Promise of products
   */
  get products(): Promise<Product[]> {
    return this.databaseService.get('/products') as Promise<any>
  }
}
