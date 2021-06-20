import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit, OnChanges {
  @Input() playerForm: any;
  @Output() playerValue: EventEmitter<any> = new EventEmitter<any>();
  @Input() submit: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.dataForm = this.formBuilder.group({
    //   playerNumber: [this.player.playerNumber, Validators.required],
    //   address: [this.player.address, Validators.required],
    //   selectedValue: [this.player.selectedValue, Validators.required],
    // })
  }
  ngOnChanges(): void {
    // setTimeout(() => {
    this.onChanges();

    //   this.dataForm.get("playerNumber").setValue(this.player.playerNumber);
    //   this.dataForm.get("address").setValue(this.player.address);
    //   this.dataForm.get("selectedValue").setValue(this.player.selectedValue);
    // }, 1000)

  }

  onValChange(value: any) {
    // console.log(this.dataForm)
    // console.log(`Player number ${this.dataForm.get("playerNumber")} select ${value} (key is ${coinFace[value]})`)
    // this.playerValue.emit(this.playerForm);
  }

  onChanges(): void {
    let me = this;
    this.playerForm.valueChanges.subscribe((val: any) => {
      me.playerValue.emit(this.playerForm);
    });
  }

}

enum coinFace {
  BTC = 0,
  ETH = 1
}
