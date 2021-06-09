//import { leaders } from './../shared/leaders';
import { leader } from './../shared/leader';
import { Injectable } from '@angular/core';
//import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getServices(): Observable<leader[]>{
    
    return this.http.get<leader[]>(baseURL + 'leadership');
  }

  getService(id: number): Observable<leader> {
    
    return this.http.get<leader>(baseURL + 'leadership/' + id);
   }

   getFeaturedService(): Observable<leader> {
   
    return this.http.get<leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]));
  }

  /*getServices(): Promise<leader[]>{
    //return new Promise(resolve=>{setTimeout(() => resolve(leaders),2000)});
    return of(leaders).pipe(delay(2000)).toPromise();
  }

  getService(id: string): Promise<leader> {
   // return  Promise.resolve(leaders.filter((Leader) => (Leader.id === id))[0]);
   //return  new Promise(resolve=>{setTimeout(()=>resolve(leaders.filter((Leader) => (Leader.id === id))[0]),2000)});
   return  of(leaders.filter((Leader) => (Leader.id === id))[0]).pipe(delay(2000)).toPromise();
  }

  getFeaturedService(): Promise<leader> {
    //return Promise.resolve(leaders.filter((Leader) => Leader.featured)[0]);
    //return new Promise(resolve =>{setTimeout(()=>resolve(leaders.filter((Leader) => Leader.featured)[0]),2000)});
    return of(leaders.filter((Leader) => Leader.featured)[0]).pipe(delay(2000)).toPromise();
  }*/

  /*getServices(): Observable<leader[]>{
    //return new Promise(resolve=>{setTimeout(() => resolve(leaders),2000)});
    return of(leaders).pipe(delay(2000));
  }

  getService(id: string): Observable<leader> {
   // return  Promise.resolve(leaders.filter((Leader) => (Leader.id === id))[0]);
   //return  new Promise(resolve=>{setTimeout(()=>resolve(leaders.filter((Leader) => (Leader.id === id))[0]),2000)});
   return  of(leaders.filter((Leader) => (Leader.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedService(): Observable<leader> {
    //return Promise.resolve(leaders.filter((Leader) => Leader.featured)[0]);
    //return new Promise(resolve =>{setTimeout(()=>resolve(leaders.filter((Leader) => Leader.featured)[0]),2000)});
    return of(leaders.filter((Leader) => Leader.featured)[0]).pipe(delay(2000));
  }*/
}
