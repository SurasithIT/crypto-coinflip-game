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
    betResult: any = null;
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

    public async bet(player1addr: string, player1res: number, player2addr: string, player2res: number): Promise<any> {
        //call bet function from smart contract
        let ms: number = Date.now();
        console.log(ms)
        return this.contract
            .bet(player1addr, player1res, player2addr, player2res, ms)
            .then((result: any) => {
                console.log(result);
                this.betResult = result;
                return result;
            })
            .catch((err: any) => {
                console.log(err);
                throw err;
            });
    }

    public async getBetResult() {
        return this.betResult;
    }
    public async transferByMetaMask(to: string, from: string, amount: number) {

        let wei = ethers.utils.parseEther(amount.toString());

        const transactionParameters = {
            // nonce: '0x00', // ignored by MetaMask
            // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            // gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: to.toLowerCase(), // Required except during contract publications.
            from: from.toLowerCase(), // must match user's active address.
            value: wei.toString(), // Only required to send ether to the recipient from the initiating external account.
            // data:
            //     '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
    }


    public async transfer(to: string, from: string, amount: number) {
        //call bet function from smart contract
        let contractWithSigner = this.contract.connect(from);
        console.log("contractWithSigner", contractWithSigner)
        return contractWithSigner
            .transfer(to, {
                from: from,
                value: ethers.utils.parseEther(amount.toString()),
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