import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ContractService } from 'src/app/cores/services/contract.service';

@Component({
  selector: 'app-coin',
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
      transition('active => inactive', animate('250ms ease-out')),
      transition('inactive => active', animate('250ms ease-in'))
    ])
  ]
})
export class CoinComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() flipAction: boolean = true;
  @Output() res: EventEmitter<any> = new EventEmitter<any>();

  flip: string = 'inactive';
  result: any = {
    active: "BTC",
    inactive: "ETH",
  }
  constructor(
    private contractService: ContractService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }


  ngOnChanges(): void {
    setTimeout(async () => {
      while (this.flipAction) {
        await this.toggleFlip();
      }
      if (this.result !== this.contractService.getBetResult()) {
        await this.toggleFlip();
      }
    }, 100)
    // console.log("bet result from coin ", this.betReult)
    this.res.emit(this.result[this.flip]);
  }

  toggleFlip() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
        resolve('true');
      }, 250)
    });
  }

}
