import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/productType/productType.component';
import { LoginComponent } from './components/login/login.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: 'product', component: ProductComponent },
    { path: 'product-type', component: ProductTypeComponent },
    { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);