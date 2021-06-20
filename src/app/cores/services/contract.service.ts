import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    provider: any = null;
    signer: any = null;
    account: any = null;
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

    //   public async getUserBalance(): Promise<number> {
    //     let account = await this.getAccount();

    //     return new Promise((resolve, reject) => {
    //       let _web3 = this._web3;
    //       this._tokenContract.balanceOf.call(account, function (err: any, result: any) {
    //         if (err != null) {
    //           reject(err);
    //         }

    //         resolve(_web3.fromWei(result));
    //       });
    //     }) as Promise<number>;
    //   }
    // this._tokenContract = this._web3.eth.contract(tokenAbi).at(this._tokenContractAddress);
}