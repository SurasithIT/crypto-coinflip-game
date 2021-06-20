import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-coin-toss',
  templateUrl: './coin-toss.component.html',
  styleUrls: ['./coin-toss.component.scss']
})
export class CoinTossComponent implements OnInit {
  @Output() tossEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() tossForm: any;
  @Input() submit: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {

  }

  tossCoin() {
    this.tossEvent.emit(true);
  }
}
