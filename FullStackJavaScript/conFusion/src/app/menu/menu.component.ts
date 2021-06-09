import { DishService } from './../services/dish.service';
//import { DISHES } from './../shared/dishes';

import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from './../shared/dish';
//import{DishService} from '../services/dish.service'
//import { from } from 'rxjs';
//import { baseURL } from '../shared/baseurl';
import { flyInOut, expand } from '../animations/app.animation';

//const DISHES_LOCAL:  Dish[] =  DISHES;
  

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})


export class MenuComponent implements OnInit {

  dishes: Dish[];
  errorMess: String;

  //selectedDish: Dish;
  
  /*onSelected(Dish: Dish){
    this.selectedDish=Dish;
  }*/


  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL) { }

  
  /*constructor(private dishService: DishService) {

   }*/

  ngOnInit(): void {
    /*this.dishService.getDishes()
    .then(dishes=> this.dishes = dishes);*/
    //console.log(baseURL);
    //alert(baseURL);
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes, errormess=> this.errorMess = <any>errormess);
  }
  

}
