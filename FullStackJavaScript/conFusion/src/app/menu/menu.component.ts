import { DishService } from './../services/dish.service';
//import { DISHES } from './../shared/dishes';

import { Component, OnInit } from '@angular/core';
import { Dish } from './../shared/dish';
//import{DishService} from '../services/dish.service'
import { from } from 'rxjs';

//const DISHES_LOCAL:  Dish[] =  DISHES;
  

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish: Dish;
  
  onSelected(Dish: Dish){
    this.selectedDish=Dish;
  }

  constructor(private dishService: DishService) {

   }

  ngOnInit(): void {
    this.dishes= this.dishService.getDishes();
  }
  

}
