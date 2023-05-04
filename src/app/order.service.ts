import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Order } from './models/Order';
import { Product } from './models/Product';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private path = '/orders'

  constructor(private databaseService: DatabaseService) {}

  /**
   * 
   * @returns orders
   */
  async orders(): Promise<Order[]> {
    let object = await this.databaseService.get(this.path)
    let orders: Order[] = [];
    for(let key in object) {
      let item = object[key as keyof typeof object] as unknown as Order
      item.date = new Date(item.date)
      orders.push(item)

    }
    return orders
  }

  async addOrder(username: string, shoppingCart: Product[]) {

    let order: Order = {
      id: await this.generateId(),
      username: username,
      shoppingCart: shoppingCart,
      date: new Date(Date.now())
    } 
    console.log(order)
    this.databaseService.post(this.path, order.id.toString(), order)
  }

  private async generateId(): Promise<number> {
    return await this.orders().then(orders => {
      let currentIds = orders.map(value => value.id)

      let id = 0;
      while(true) {
        if (!currentIds.includes(id)) {
          return id
        }
      id++
    }
  })
}
    
}
