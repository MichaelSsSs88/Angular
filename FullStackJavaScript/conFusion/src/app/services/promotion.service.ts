import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import{of} from 'rxjs';


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

  getPromotions(): Observable<Promotion[]> {
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


  constructor() { }
}
