import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/productType/productType.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/product', pathMatch: 'full' },
    { path: 'product', component: ProductComponent },
    { path: 'product-type', component: ProductTypeComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);