import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { ProductType } from '../../models/product_type.model';

@Component({
    moduleId: module.id,
    selector: 'app-productType',
    templateUrl: './productType.component.html'
})
export class ProductTypeComponent implements OnInit {
    
    /**
     *
     */
    constructor(private productService: ProductService) {
        //called first time before the ngOnInit()

    }

    ngOnInit() {
        //called after the constructor and called  after the first ngOnChanges() 
    }
}
