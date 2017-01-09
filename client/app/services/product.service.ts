import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Product } from '../models/product.model';

@Injectable()

export class ProductService {
    /**
     *
     */
    constructor(private http: Http) {
        console.log("ProductService Initialized...");
    }

    getProducts() {
        return this.http.get('/api/product/products')
            .map(res => res.json());
    }

    addProduct(newProduct: Product) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/product', JSON.stringify(newProduct), { headers: headers })
            .map(res => res.json());
    }

    deleteProduct(id: string) {
        return this.http.delete('/api/product/' + id)
            .map(res => res.json());
    }

    editProduct(context: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/product/' + context.product._id, JSON.stringify(context.product), { headers: headers })
            .map(res => res.json());
    }
}

