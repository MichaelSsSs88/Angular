import { DishService } from './../services/dish.service';
import { MenuComponent } from './../menu/menu.component';
import { Component, OnInit, Input } from '@angular/core';
import { Dish } from './../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';





@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @Input() selectedDish: Dish;
  dish: Dish;
  dishIds: string [];
  prev: string;
  next: string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    //const id = +this.route.snapshot.params['id'];
    //this.dishservice.getDish(id.toString()).then(dish => this.dish = dish );
    //this.dishservice.getDish(id.toString()).subscribe(dish => this.dish = dish );
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

}
