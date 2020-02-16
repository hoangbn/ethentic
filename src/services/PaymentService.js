import web3 from '../utils/web3';

const ETH_ADDRESS = '0x41B398EA4497c8484bF243D62A761046aF25B5Df';
const WEI_TO_ETHER = 10**18;
//const desiredNetwork = '4'; // '1' is the Ethereum main network ID.
const value = WEI_TO_ETHER * 44;

export default class PaymentService {
  static isEthereumCompatible() {
    if (typeof window.ethereum === 'undefined') {
      alert('Looks like you need a Dapp browser to get started.');
      alert('Consider installing MetaMask!');
      return false;
    }
    return true;
  }

  static receivePayment() {
    if (!this.isEthereumCompatible()) return;
    let ethereum = window.ethereum;
    // ask user to sign in and reveal their accounts with MetaMask
    ethereum.enable()
        // Remember to handle the case they reject the request:
        .catch(reason => {
          if (reason === 'User rejected provider access') {
            // The user didn't want to sign in!
          } else {
            // This shouldn't happen, so you might want to log this...
            alert('There was an issue signing you in.')
          }
        })
        // in the case they approve the log-in request, we receive account
        .then(accounts => {
          // verify the user is on the correct network:
          //if (ethereum.networkVersion !== desiredNetwork) {
            // return alert('This application requires the main network, please switch it in your MetaMask UI.')
          //}
          // suggest transactions and signatures:
          const account = accounts[0];
          this.sendPayment(account, ETH_ADDRESS, function (err, transaction) {
            if (err) return alert(`An error has occurred!`);
            alert('Purchase Successful!')
          })
        });
  }

  static sendPayment(sendingAccount, receivingAccount, callback) {
    if (!this.isEthereumCompatible()) return;
    let ethereum = window.ethereum;

    // We're going to use the lowest-level API here, with simpler example links below
    const method = 'eth_sendTransaction';
    const parameters = {
      from: sendingAccount,
      to: receivingAccount,
      value: value,
    };

    // Now putting it all together into an RPC request:

    web3.eth.sendTransaction(parameters, (err, response) => {
    //
    // })
    // // Methods that require user authorization like this one will prompt a user interaction.
    // // Other methods (like reading from the blockchain) may not.
    // ethereum.sendAsync(payload, function (err, response) {
      if (err) {
        console.error(err);
        return alert('There was an issue, please try again.')
      } 
    const rejected = 'User denied transaction signature.';
      if (response.error && response.error.message.includes(rejected)) {
        return alert(`We can't take your money without your permission.`)
      }

      if (response.result) {
        // If there is a response.result, the call was successful.
        // In the case of this method, it is a transaction hash.
        const txHash = response.result;
        alert('Thank you for your purchase!');

        // You can poll the blockchain to see when this transaction has been mined:
        pollForCompletion(ethereum, txHash, callback)
      }
    });

    function pollForCompletion(ethereum, txHash, callback) {
      let calledBack = false;

      // Normal ethereum blocks are approximately every 15 seconds.
      // Here we'll poll every 2 seconds.
      const checkInterval = setInterval(function () {

        const notYet = 'response has no error or result';
        ethereum.sendAsync({
          method: 'eth_getTransactionByHash',
          params: [txHash],
        }, function (err, response) {
          if (calledBack) return;
          if (err || response.error) {
            if (err.message.includes(notYet)) {
              return 'transaction is not yet mined'
            }

            callback(err || response.error)
          }

          // We have successfully verified the mined transaction.
          // Mind you, we should do this server side, with our own blockchain connection.
          // Client side we are trusting the user's connection to the blockchain.
          const transaction = response.result;
          clearInterval(checkInterval);
          calledBack = true;
          callback(null, transaction)
        })
      }, 2000)
    }

  }
}

const repaymentValue = (UserValue, AIValue,) => {
  if (AIValue) {
    ReturnValue = WEI_TO_ETHER * 0.07
    var totalValue = ReturnValue * UserValue
  }
};
