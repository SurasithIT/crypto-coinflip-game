import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-coin-toss',
  templateUrl: './coin-toss.component.html',
  styleUrls: ['./coin-toss.component.scss']
})
export class CoinTossComponent implements OnInit {
  @Output() tossEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() res: EventEmitter<string> = new EventEmitter<string>();
  @Input() tossForm: any;
  @Input() submit: boolean = false;
  flipAction = true;
  start = true;
  @Output() flipActionEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
  ) { }

  ngOnInit(): void {

  }

  tossCoin() {
    this.start = false;
    this.tossEvent.emit(true);
    // Call smart contract
    this.flipAction = true;

    setTimeout(() => {
      this.flipAction = false;
    }, this.getRandomArbitrary(3, 5) * 1000)
  }

  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  getResult($event: any) {
    console.log($event);
    this.res.emit($event);
    this.flipActionEvent.emit(this.flipAction);
  }

}
