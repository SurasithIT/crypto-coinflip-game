import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-test',
  templateUrl: './coin.component.html',
  styles: [
    `
    .tp-wrapper {
      perspective: 800px;
    }
    
    .tp-box {
      position: relative;
      width: 200px;
      height: 100px;
      margin: 7rem auto;
      transform-style: preserve-3d;
      transition: transform 1s;
    }
    .tp-box__side {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;
      text-align: center;
      line-height: 100px;
      font-size: 24px;
      font-weight: 700;
      cursor: pointer;
      user-select: none;
    }
    .tp-box__front {
    }
    .tp-box__back {
      transform: rotateY(179.9deg);
    }

    `
  ],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CoinComponent implements OnInit, AfterViewInit {

  flip: string = 'inactive';
  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    setTimeout(async () => {
      while (true) {
        await this.toggleFlip();
      }
    }, 100)


  }

  toggleFlip() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
        resolve('true');
      }, 500)
    });
    // setTimeout(() => {
    //   this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    // }, 100)
  }

}
