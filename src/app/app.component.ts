import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ContractService } from './cores/services/contract.service';
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crypto-coinflip-game';
  constructor(
    private contractService: ContractService
  ) {
  }
  async ngOnInit() {
    await this.contractService.initial();
    let signer = await this.contractService.getSigner();
    console.log(signer);
    let address = await this.contractService.getSignerAddress();
    console.log(address);
    let balance = await this.contractService.getSingerBalance();
    console.log(balance);
    let balance2 = await this.contractService.getBalance(address);
    console.log(balance2);
  }
}
