import { Injectable } from '@angular/core';
declare let window: any;
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor() {

    if (window.ethereum) {

      window.web3 = new Web3(window.web3.currentProvider);

    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // commented for future use
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

  }

  connect() {
    if (window.ethereum) {
      // commented for future use
      return new Promise((resolve, reject) => {

        let temp = window.ethereum.enable();
        if (temp) {
          resolve(temp)
        } else {
          reject('err');
        }

      })
    }
  }

  async export() {
    if (window.web3) {
      return new Promise((resolve, reject) => {
        window.web3.eth.getAccounts((error, result) => {

          // just 1 min jo
          if (error != null) {
            resolve([]);
          }
          if (result == undefined || result.length == 0) {
            // alert("No account found! Make sure the Ethereum client is configured properly.");
            resolve([]);
          } else {

            let account = result[0];

            window.web3.eth.defaultAccount = account;

            resolve(account)
          }
        })
      })
    } else {
      // this.toaster.error('No account found! Make sure the Ethereum client is configured properly. ')
    }

  }
}
