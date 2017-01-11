import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from './app.routing';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HttpClientService } from './services/httpClient/httpClient.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from './components/aside/aside.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/productType/productType.component';
import { ProductService } from './services/product.service';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    ProductComponent,
    ProductTypeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    AuthenticationService,
    HttpClientService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
