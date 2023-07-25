import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  //  pagination?: Pagination<Product[]>;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];

  constructor(private http: HttpClient) { }

  //getProducts(brandId?: number, typeId?: number, sort?: string) {
    getProducts(shopParams: ShopParams) {
    //angular param for the query string
      let params = new HttpParams();
      
      if (shopParams.brandId > 0) params = params.append('brandId', shopParams.brandId);
      if (shopParams.typeId) params = params.append('typeId', shopParams.typeId);
             params = params.append('sort', shopParams.sort);
             params = params.append('pageIndex', shopParams.pageNumber);
             params = params.append('pageSize', shopParams.pageSize);
      if(shopParams.search) params = params.append('search', shopParams.search);

    //return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products?pageSize=50');//better way to include the query string is to use angular params
    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params: params});
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
