import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './models/Product';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private path = '/products'

  constructor(private databaseService: DatabaseService) {}

  /**
   * getter for Promise of products
   */
  async products(): Promise<Product[]> {
    let object = await this.databaseService.get(this.path)
    let products: Product[] = [];
    for(let key in object) {
      products.push(object[key as keyof typeof object] as unknown as Product)
    }
    return products
  }
}
