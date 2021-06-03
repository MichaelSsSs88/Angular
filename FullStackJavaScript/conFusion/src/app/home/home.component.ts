import { LeaderService } from './../services/leader.service';
import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, private leaderSevice: LeaderService) { }

  ngOnInit(): void {
    //this.dishservice.getFeaturedDish().then(dish => this.dish= dish);
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish= dish);
    //this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    //this.leaderSevice.getFeaturedService().then(leader=>this.leader= leader);
    this.leaderSevice.getFeaturedService().subscribe(leader=>this.leader= leader);
  }

}
