import { LeaderService } from './../services/leader.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: leader;

  dishErrMess:String;


  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, private leaderSevice: LeaderService,@Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    //this.dishservice.getFeaturedDish().then(dish => this.dish= dish);
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish= dish, errmess=> this.dishErrMess = <any>errmess);
    //this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    //this.leaderSevice.getFeaturedService().then(leader=>this.leader= leader);
    this.leaderSevice.getFeaturedService().subscribe(leader=>this.leader= leader);
  }

}
