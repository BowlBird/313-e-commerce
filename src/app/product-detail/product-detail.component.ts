import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_PRODUCT, Product } from '../models/Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  constructor(private route: ActivatedRoute, private productService: ProductService) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.products().then(
      value => {
        this.product = value[id]
      }
    )
  }

  product: Product = DEFAULT_PRODUCT
}
