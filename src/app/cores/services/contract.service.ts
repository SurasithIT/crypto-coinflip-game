import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { AppSettings } from '../app-settings';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    provider: any = null;
    signer: any = null;
    account: any = null;
    contractJSON = require("./truffle/build/contracts/KOSCoinflip.json");
    winner: string = "";
    contractAddress = AppSettings.CONTRACT_ADDRESS;
    contractABI = this.contractJSON.abi;
    contract: any = null;
    constructor() {
    }

    public async initial() {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.enable()

            // Use Mist/MetaMask's provider
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner()
            // this.provider.getBalance().then((result: any) => {
            //     console.log(result)
            // }).catch((err: any) => {
            //     console.error(err);
            // });
            // this._web3 = new Web3(window.web3.currentProvider);

            //   if (this._web3.version.network !== '4') {
            //     alert('Please connect to the Rinkeby network');
            //   }

            // init contract
            this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
            // console.log(contract);

            // init contract with sign wallet
            // let contractWithSigner = contract.connect(wallet);
        } else {
            console.warn(
                'Please use a dapp browser like mist or MetaMask plugin for chrome'
            );
        }
    }

    public async getSigner(): Promise<any> {
        this.signer = this.provider.getSigner()
        return this.signer;
    }

    public async getSignerAddress(): Promise<any> {
        return this.signer.getAddress();
    }


    public async getSingerBalance(): Promise<string> {
        return ethers.utils.formatEther(await this.signer.getBalance());
    }

    public async getBalance(address: string): Promise<string> {
        return ethers.utils.formatEther(await this.provider.getBalance(address));
    }

    public async bet(player1addr: string, player1res: number, player2addr: string, player2res: number) {
        //call bet function from smart contract
        this.contract
            .bet(player1addr, player1res, player2addr, player2res)
            .then((result: any) => {
                console.log(result);
                return result;
            })
            .catch((err: any) => {
                console.log(err);
                throw err;
            });
    }

    public async transfer(to: string, from: string, amount: number) {
        //call bet function from smart contract
        let contractWithSigner = this.contract.connect(from);
        contractWithSigner
            .transferFund(to, {
                from: from,
                value: amount,
                //   value: web3.toWei(_amount, "ether"),
            })
            .then((result: any) => {
                console.log(result);
                return result;
            })
            .catch((err: any) => {
                console.log(err);
                throw err;
            });
    }

}