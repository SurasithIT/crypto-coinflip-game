import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges, AfterViewInit {
  // @ViewChild('coin') coin:ElementRef; 
  // @ViewChild("coin") sort: ElementRef;

  player1Form: any;
  player2Form: any;
  tossForm: any;
  submit: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.player1Form = this.formBuilder.group({
      playerNumber: [1, Validators.required],
      address: ["", Validators.required],
      selectedValue: ["", Validators.required],
    })

    this.player2Form = this.formBuilder.group({
      playerNumber: [2, Validators.required],
      address: ["", Validators.required],
      selectedValue: ["", Validators.required],
    })

    this.tossForm = this.formBuilder.group({
      bet: [0, Validators.required]
    })
  }

  ngOnChanges(): void {
    console.log(
      this.player1Form.value
    )
    console.log(
      this.player2Form.value
    )
  }

  ngAfterViewInit(): void {
    // console.log(coin);
  }

  selectedValue($event: any) {
    if ($event.get("playerNumber").value == 1) {
      if ($event.get("selectedValue").value == coinFace[0]) this.player2Form.get("selectedValue").setValue(coinFace[1], { emitEvent: false });
      if ($event.get("selectedValue").value == coinFace[1]) this.player2Form.get("selectedValue").setValue(coinFace[0], { emitEvent: false });
    }
    else if ($event.get("playerNumber").value == 2) {
      if ($event.get("selectedValue").value == coinFace[0]) this.player1Form.get("selectedValue").setValue(coinFace[1], { emitEvent: false });
      if ($event.get("selectedValue").value == coinFace[1]) this.player1Form.get("selectedValue").setValue(coinFace[0], { emitEvent: false });
    }
  }

  tossedCoin($event: any) {
    // this.flip();
    this.submit = true;
    console.log("tossCoin : ", $event)
    if (this.player1Form.invalid || this.player2Form.invalid) {
      return;
    }
    window.alert("Flip coin and see who will win.")
  }
}


enum coinFace {
  BTC = 0,
  ETH = 1
}
