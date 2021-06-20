import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContractService } from 'src/app/cores/services/contract.service';

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
  res: any;
  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService
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

  async tossedCoin($event: any) {
    let _p1Addr = this.player1Form.get("address").value;
    let _p1ans = coinFace[this.player1Form.get("selectedValue").value];
    let _p2Addr = this.player2Form.get("address").value;
    let _p2ans = coinFace[this.player2Form.get("selectedValue").value];

    await this.contractService.bet(_p1Addr, parseInt(_p1ans), _p2Addr, parseInt(_p2ans));
    // this.flip();
    this.submit = true;
    console.log("tossCoin : ", $event)
    if (this.player1Form.invalid || this.player2Form.invalid) {
      return;
    }
    window.alert("Flip coin and see who will win.")
  }

  getFlipActionEvent($event: any) {
    console.log($event)
    if ($event == false) {
      console.log("Stop")
      console.log("resultKey : ", coinFace[this.res])
      let winner: number = 0;
      if (this.player1Form.get("selectedValue").value == this.res) {
        winner = this.player1Form.get("playerNumber").value;
      } else if (this.player2Form.get("selectedValue").value == this.res) {
        winner = this.player2Form.get("playerNumber").value;
      }
      setTimeout(() => {
        window.alert("Winner is player " + winner)
      }, 1000)
    }
  }
  getResult($event: any) {
    this.res = $event;
  }
}


enum coinFace {
  BTC = 0,
  ETH = 1
}
