import { comment } from './../shared/comment';
import { DishService } from './../services/dish.service';
import { MenuComponent } from './../menu/menu.component';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from './../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

//import { animate, state, style, transition, trigger } from '@angular/animations';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand(),
    ],
  
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;

  dishcopy: Dish;
  feedbackForm: FormGroup;
  comment: comment;
  date: string;
  datefalse: Date;
  x: string;
  tickInterval = 1;
  autoTicks = false;
  showTicks = false;
  value = 0;
  visibility = 'shown';
  

  @Input() selectedDish: Dish;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  nameDate: String;
  errorMess: String;
   month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder,@Inject('BaseURL') public BaseURL){
      this.date= new Date().toDateString();
      
      this.datefalse= new Date();
      
      this.date="";
      this.date += this.month[this.datefalse.getMonth()] + ' ';
      this.date += this.datefalse.getDate().toString() + ",";
      this.date += this.datefalse.getFullYear().toString();

      this.createForm();
      
  }

  ngOnInit(): void {
   
    //const id = +this.route.snapshot.params['id'];
    //this.dishservice.getDish(id.toString()).then(dish => this.dish = dish );
    //this.dishservice.getDish(id.toString()).subscribe(dish => this.dish = dish );
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    
    this.route.params
    .pipe(switchMap((params: Params) => {this.visibility='hidden'; return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility='shown';},
      errmess => this.errorMess = <any>errmess );
  }

  formErrors = {
    'name': '',
    'rating': '',
    'comment': '',
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'rating': {
      'required': 'Rafting is required.'
    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Comment cannot be less than 30 characters long.',
      'maxlength': 'Comment cannot be more than 500 characters long.'
    }

  };

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  };

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [50, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
    });

    this.feedbackForm.valueChanges
                    .subscribe(data=>this.onValueChanged(data));
    

    this.onValueChanged();

  };

  onSubmit() {
    this.comment = this.feedbackForm.value;
    console.log(this.comment);
    //const index = this.dishIds.indexOf(this.prev+1);
    //alert(this.dish.id);
    this.comment.rating= this.feedbackForm.value.rating;
    this.comment.comment= this.feedbackForm.value.comment;
    this.comment.author= this.feedbackForm.value.name;
    this.comment.date= this.datefalse.toString();
    this.nameDate= this.feedbackForm.value.name + ' ' + this.date;
    //this.dish.comments.push(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errorMess = <any>errmess; });
    this.feedbackForm.reset({
      name: '',
      rafting: 50,
      comment: ''
    });
    this.feedbackFormDirective.resetForm();
  };

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
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
