import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-coin-toss',
  templateUrl: './coin-toss.component.html',
  styleUrls: ['./coin-toss.component.scss']
})
export class CoinTossComponent implements OnInit {
  @Output() tossEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  tossCoin() {
    this.tossEvent.emit(true);
  }
}
