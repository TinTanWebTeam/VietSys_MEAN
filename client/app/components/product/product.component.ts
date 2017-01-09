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
  public product: Product = new Product();

  /**
   *
   */
  constructor(private productService: ProductService) {
    //called first time before the ngOnInit()

  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges() 

    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  public addProduct(event: Event): void {
    event.preventDefault();

    this.productService.addProduct(this.product)
      .subscribe(
        product => {
          this.products.push(product);
          this.product = new Product();
        }
      );
  }

  public deleteProduct(id: any): void {
    let products = this.products;

    this.productService.deleteProduct(id)
      .subscribe(
      data => {
        if (data.n == 1) {
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id == id) {
              products.splice(i, 1);
            }
          }
        }
      }
      );
  }

  public loadProduct(id: string): void {
    for (let i in this.products) {
      if (this.products[i]['_id'] == id) {
        this.product = this.products[i];
      }
    }
  }

  public editProduct(event: Event): void {
    event.preventDefault();
    // let products = this.products;
    let context = this;

    this.productService.editProduct(context)
      .subscribe(
      (success: Product) => {
        let oldProduct = context.products.find(function(o){
          return o._id == context.product._id;
        });
        oldProduct = success;

        context.product = new Product();
      }
      );
  }
}
