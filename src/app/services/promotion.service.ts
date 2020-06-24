import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { resolve } from 'url';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { p } from '@angular/core/src/render3';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]>{
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: String):Observable<Promotion> {

    return of(PROMOTIONS.filter((promote) => (promote.id == id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion():Observable<Promotion>{
    return of(PROMOTIONS.filter((promote) => (promote.featured))[0]).pipe(delay(2000));
      
  }
}
