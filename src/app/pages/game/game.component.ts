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
  player1Selected = "";
  player2Selected = "";

  player1: Player = {
    playerNumber: 1,
    address: "",
    selectedValue: ""
  }
  player2: Player = {
    playerNumber: 2,
    address: "",
    selectedValue: ""
  }
  player1Form: any;
  player2Form: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.player1Form = this.formBuilder.group({
      playerNumber: [this.player1.playerNumber, Validators.required],
      address: [this.player1.address, Validators.required],
      selectedValue: [this.player1.selectedValue, Validators.required],
    })

    this.player2Form = this.formBuilder.group({
      playerNumber: [this.player2.playerNumber, Validators.required],
      address: [this.player2.address, Validators.required],
      selectedValue: [this.player2.selectedValue, Validators.required],
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

  flip() {
    console.log("Flip coin");
    // let coin = document.querySelector<HTMLElement>(".coin");
    //     let i = Math.floor(Math.random() * 2);
    //     // let coin = this.coin
    //     coin.style.animation = "none";
    //     if (i) {
    //       setTimeout(function () {
    //         coin.style.animation = "spin-heads 3s forwards";
    //       }, 100);
    //       // heads++;
    //     }
    //     else {
    //       setTimeout(function () {
    //         coin.style.animation = "spin-tails 3s forwards";
    //       }, 100);
    //       // tails++;
    //     }
    //     // setTimeout(updateStats, 3000);
    //     // disableButton();
  }

}


enum coinFace {
  BTC = 0,
  ETH = 1
}

export interface Player {
  playerNumber: number;
  address: string;
  selectedValue: string;
}