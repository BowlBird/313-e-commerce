import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.products().then(
      value => this.products = value
    )
  }
  products: Product[] = []
  search: string = ''

  updateProducts() {
    this.productService.products().then(
      value => {
        this.products = value.filter(
          product => product.title.includes(this.search)
        )
      }
    )
  }
}
