// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,




  main: 'Mainnet',
  rops: 'Ropsten',
  rinkeby: 'Rinkeby',
  Goerli: 'Goerli',
  Kovan: 'Kovan',
  // Binance Smart Chain Main Network 
  bscMainnet: 'bsc-mainnet',
  // Binance Smart Chain Test Network 
  bscTestnet: 'bsc-testnet',

  divideValue: 1000000000000000000,

  URL: 'http://localhost:7000',


  SCaddress: '0x0efD99340071A4bDf3E227AC196F166Ac9077DcC',
  SCABI: [{"inputs":[{"internalType":"uint256","name":"_releastTokenDuration","type":"uint256"},{"internalType":"uint256","name":"_releaseToken","type":"uint256"},{"internalType":"contract IERC20","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_releastTokenDuration","type":"uint256"},{"internalType":"uint256","name":"_releaseToken","type":"uint256"}],"name":"changeConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nextPossibleClaimAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releasableToken","outputs":[{"internalType":"uint256","name":"_releaseToken","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releaseToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releastTokenDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
