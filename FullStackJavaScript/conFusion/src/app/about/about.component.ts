import { LeaderService } from './../services/leader.service';
//import { leaders } from './../shared/leaders';
import { leader } from './../shared/leader';
import { Component, Inject, OnInit } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class AboutComponent implements OnInit {
  Leader: leader[];

  constructor(private leaderService: LeaderService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    //this.leaderService.getServices().then(Leader=> this.Leader= Leader);
    this.leaderService.getServices().subscribe(Leader=> this.Leader= Leader);

  }

}
