import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/productType/productType.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CanActivateViaProductType } from './middlewares/CanActivateViaProductType.middleware';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product-type', component: ProductTypeComponent, canActivate: [CanActivateViaProductType] },
    { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);