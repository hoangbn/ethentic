import React, { Component } from 'react'
import web3 from '../utils/web3';
import storehash from '../utils/storehash';
const Ipfs = require('ipfs-mini');

export default class MetaMask extends Component {
 
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''   
    };

    onClick = async () => {
        try{
                this.setState({blockNumber:"waiting.."});
                this.setState({gasUsed:"waiting..."});
        //get Transaction Receipt in console on click
        //See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
                  console.log(err,txReceipt);
                  this.setState({txReceipt});
                }); //await for getTransactionReceipt
        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
                await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
              } //try
            catch(error){
                console.log(error);
              } //catch
          } //onClick

        onSubmit = async (event) => {
              event.preventDefault();
             //bring in user's metamask account address
              const accounts = await web3.eth.getAccounts();
             
              console.log('Sending from Metamask account: ' + accounts[0]);
            //obtain contract address from storehash.js
              const ethAddress = await storehash.options.address;
              this.setState({ethAddress});
            //save document to IPFS,return its hash#, and set hash# to state
              await ipfs.add(this.state.buffer, (err, ipfsHash) => {
                console.log(err,ipfsHash);
                //setState by setting ipfsHash to ipfsHash[0].hash 
                this.setState({ ipfsHash:ipfsHash[0].hash });
           // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
          //return the transaction hash from the ethereum contract
         //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
                
                storehash.methods.sendHash(this.state.ipfsHash).send({
                  from: accounts[0] 
                }, (error, transactionHash) => {
                  console.log(transactionHash);
                  this.setState({transactionHash});
                }); //storehash 
              }) //await ipfs.add 
            }; 
          }
