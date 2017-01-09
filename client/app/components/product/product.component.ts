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

  public loadProduct(id: string): void {
    let currentProduct = this.products.find(function (o) {
      return o._id == id;
    });

    this.product = currentProduct;
  }

  public editProduct(event: Event): void {
    event.preventDefault();
    let products = this.products;
    let product = this.product;

    this.productService.editProduct(product)
      .subscribe(
      (success: Product) => {
        let oldProduct = products.find(function (o) {
          return o._id == product._id;
        });
        oldProduct = success;
      }
      );
    this.product = new Product();
  }

  public deleteProduct(id: string): void {
    let products = this.products;

    this.productService.deleteProduct(id)
      .subscribe(
      success => {
        if (success.n == 1) {
          let oldProduct = products.find(function (o) {
            return o._id == id;
          });
          let index = products.indexOf(oldProduct);
          products.splice(index, 1);
        }
      }
      );
  }
}
