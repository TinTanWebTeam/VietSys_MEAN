import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { Product } from '../../models/product.model';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpClientService } from '../../services/httpClient/httpClient.service';

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
  constructor(private authenticationService: AuthenticationService, private httpClientService: HttpClientService) {
    //called first time before the ngOnInit();
  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges() 
    this.loadData();
  }

  public loadData(): void {
    this.httpClientService.get('/api/product/products').subscribe(
      (products: Response) => {
        this.products = products.json();
      },
      (error: Response) => {

      }
    );
  }

  public addProduct(event: Event): void {
    event.preventDefault();

    this.httpClientService.post('/api/product', this.product).subscribe(
      (product: Response) => {
        this.products.push(product.json());
        this.product = new Product();
      },
      (error: Response) => {

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
    console.log(products);
    console.log(product);

    this.httpClientService.put('/api/product/', product).subscribe(
      (success: Response) => {
        let oldProduct = products.find(function (o) {
          return o._id == product._id;
        });
        oldProduct = success.json();
      },
      (error: Response) => {

      }
    );
    this.product = new Product();
  }

  public deleteProduct(id: string): void {
    let products = this.products;

    this.httpClientService.delete('/api/product/' + id).subscribe(
      (success: Response) => {
        if (success.json().n == 1) {
          let oldProduct = products.find(function (o) {
            return o._id == id;
          });
          let index = products.indexOf(oldProduct);
          products.splice(index, 1);
        }
      },
      (error: Response) => {

      }
    );
  }
}
