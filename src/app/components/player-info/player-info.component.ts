import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractService } from 'src/app/cores/services/contract.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit, OnChanges {
  @Input() playerForm: any;
  @Output() playerValue: EventEmitter<any> = new EventEmitter<any>();
  @Input() submit: boolean = false;
  balance: string = "0";
  constructor(
    private formBuilder: FormBuilder,
    private contracService: ContractService
  ) { }

  ngOnInit(): void {
    // this.dataForm = this.formBuilder.group({
    //   playerNumber: [this.player.playerNumber, Validators.required],
    //   address: [this.player.address, Validators.required],
    //   selectedValue: [this.player.selectedValue, Validators.required],
    // })
  }
  async ngOnChanges(): Promise<void> {
    this.onChanges();
  }

  onChanges(): void {
    let me = this;
    this.playerForm.valueChanges.subscribe(async (val: any) => {
      me.playerValue.emit(this.playerForm);
      if (this.playerForm.get("address").value != null && this.playerForm.get("address").value != "") {
        this.balance = await this.contracService.getBalance(this.playerForm.get("address").value);
      } else {
        this.balance = "0";
      }
    });
  }

}

enum coinFace {
  BTC = 0,
  ETH = 1
}
