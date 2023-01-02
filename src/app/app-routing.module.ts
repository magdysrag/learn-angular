import { RegisterComponent } from "./component/register/register.component";
import { DetailsComponent } from './component/details/details.component';
import { MainLayoutComponent } from './component/mainLayout/mainLayout.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { OrderMasterComponent } from './order/order-master/order-master.component';
import { ProductListComponent } from './order/product-list/product-list.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Gaurds/auth.guard';
import { AddProductComponent } from './order/add-product/add-product.component';
// first path success work
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/:pid', component: DetailsComponent },
      {
        path: 'order',
        component: OrderMasterComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
