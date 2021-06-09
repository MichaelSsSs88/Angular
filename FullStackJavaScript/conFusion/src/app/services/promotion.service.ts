import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import{of} from 'rxjs';
import { baseURL } from '../shared/baseurl';



@Injectable({
  providedIn: 'root'
})
export class PromotionService {

 /* getPromotions(): Promise<Promotion[]> {
    //return Promise.resolve(PROMOTIONS);
    //return new Promise(resolve=>{setTimeout(()=>resolve(PROMOTIONS),2000)});
    return of(PROMOTIONS).toPromise();
  }

  getPromotion(id: string): Promise<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    //return new Promise(resolve=>{setTimeout(()=> resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000)});
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).toPromise();
  }

  getFeaturedPromotion(): Promise<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    //return new Promise(resolve=>{setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000)});
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
  }*/

  /*getPromotions(): Observable<Promotion[]> {
    //return Promise.resolve(PROMOTIONS);
    //return new Promise(resolve=>{setTimeout(()=>resolve(PROMOTIONS),2000)});
    return of(PROMOTIONS);
  }

  getPromotion(id: string): Observable<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    //return new Promise(resolve=>{setTimeout(()=> resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000)});
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    //return new Promise(resolve=>{setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000)});
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }
*/

  constructor(private http:HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    
   // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    //return new Promise(resolve=>{setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000)});
    //return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  }
}
