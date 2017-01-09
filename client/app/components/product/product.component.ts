import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  moduleId: module.id,
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  public products: Product[];
  public product: Product;

  /**
   *
   */
  constructor(private productService: ProductService) {
    //called first time before the ngOnInit()
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges() 
    this.product = {
      name: "",
      description: "",
      active: true,
      created_at: '10-01-2017',
      updated_at: '10-01-2017'
    };
  }

  addProduct(event: Event) {
    event.preventDefault();
    var newProduct: Product = {
      name: this.product.name,
      description: this.product.description,
      productType_id: this.product.productType_id,
      active: true,
      created_at: '10-01-2017',
      updated_at: '10-01-2017'
    }

    this.productService.addProduct(newProduct)
      .subscribe(
      product => {
        this.products.push(product);
        this.product.name = '';
        this.product.description = '';
        this.product.productType_id = 0;
      }
      );
  }

  deleteTask(id: string) {
    var products = this.products;

    this.productService.deleteProduct(id)
      .subscribe(
      data => {
        if (data.n == 1) {
          for (var i = 0; i < products.length; i++) {
            if (products[i]._id == id) {
              products.splice(i, 1);
            }
          }
        }
      }
      );
  }

  updateStatus(product: Product) {

  }
}
