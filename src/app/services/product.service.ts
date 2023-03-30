import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<any>;

  constructor() { 
    this.products = [
      {id: 1, name:"Computer", price:6500},
      {id: 2, name:"Smartphone", price:3500},
      {id: 1, name:"Printer", price:12000},
    ];
  }

  public getAllProducts() : Observable<Array<any>>{
    let rnd = Math.random();
    if(rnd < 0.5) return throwError(()=>new Error('Internet Connexion Error'));
    return of(this.products);
  }
}
