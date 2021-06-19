import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  // @ViewChild('coin') coin:ElementRef; 
  // @ViewChild("coin") sort: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(coin);
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
