import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = []; //where to store the response we got from our Api with an initial value of empty array.
  brands: Brand[] = [];
  types: Type[] = [];
  // brandIdSelected = 0;
  // typeIdSelected = 0;
  // sortSelected = 'name';

  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];
  totalCount = 0;  

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
   // this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe({
      this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;   //what to do next--return the product as response        
         this.shopParams.pageNumber = response.pageIndex;
         this.shopParams.pageSize = response.pageSize;
         this.totalCount = response.count;
        },
      error: error => console.log(error),  //what to do if there is an error -- log the error into the console.
      complete: () => {
        console.log('request completed');
      }
    })
  }
  getBrands() {
    this.shopService.getBrands().subscribe({
     // next: response => this.brands = response, //the reponse here is a brand array becos we don't hv a pagination here
      next: response => this.brands = [{id: 0, name: 'All'}, ...response], 
      error: error => console.log(error),
      complete: () => {
        console.log('request completed');
      }
    })
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: 'All'}, ...response],  //...-spread operator
      error: error => console.log(error),
      complete: () => {
        console.log('request completed');
      }
    })
  }

  onBrandSelected(brandId: number){
    //this.brandIdSelected = brandId;
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
   // this.typeIdSelected = typeId;
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any){
    //this.sortSelected = event.target.value;
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any){
     if (this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
     }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}