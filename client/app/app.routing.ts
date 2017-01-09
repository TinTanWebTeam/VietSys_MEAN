import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product/product.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/product', pathMatch: 'full' },
    { path: 'product', component: ProductComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);