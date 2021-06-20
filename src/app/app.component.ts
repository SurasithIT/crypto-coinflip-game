import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crypto-coinflip-game';
  balance: number = 0;
  constructor() {
  }
  ngOnInit() {
    console.log(this.balance);
  }
}
