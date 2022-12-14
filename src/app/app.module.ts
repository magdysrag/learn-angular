import { MainLayoutComponent } from './component/mainLayout/mainLayout.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutComponent } from './component/about/about.component';
import { ProductListComponent } from './order/product-list/product-list.component';
import { OrderMasterComponent } from './order/order-master/order-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LightBoxDirective } from './directives/light-box.directive';
import { InputTestDirective } from './directives/input-test.directive';
import { FirstPipePipe } from './pipe/first-pipe.pipe';
import { ArabicTsDirective } from './directives/arabic.ts.directive';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DetailsComponent } from './component/details/details.component';
import { AddProductComponent } from './order/add-product/add-product.component';
import { RegisterComponent } from './component/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    AboutComponent,
    ProductListComponent,
    LightBoxDirective,
    InputTestDirective,
    FirstPipePipe,
    OrderMasterComponent,
    ArabicTsDirective,
    NotFoundComponent,
    LoginComponent,
    MainLayoutComponent,
    DetailsComponent,
    AddProductComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,HttpClientModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
