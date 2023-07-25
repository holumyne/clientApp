import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule, // we dont need to export it,
    //RouterModule now replaced by the below becos we are now lazy loading shop
    ShopRoutingModule 
  ],
  // exports: [
  //   ShopComponent   //we no longer need to export the shopComponent becos its no longer going to be used inside our app module. its only going to be used when we are loading up our shop module.
  // ] 
})
export class ShopModule { }
