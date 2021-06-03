import { LeaderService } from './../services/leader.service';
import { leaders } from './../shared/leaders';
import { leader } from './../shared/leader';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  Leader: leader[];

  constructor(private leaderService: LeaderService ) { }

  ngOnInit(): void {
    //this.leaderService.getServices().then(Leader=> this.Leader= Leader);
    this.leaderService.getServices().subscribe(Leader=> this.Leader= Leader);

  }

}
