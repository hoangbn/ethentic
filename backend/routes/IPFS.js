const express = require('express');
const router = express.Router();
const IPFS = require('ipfs-mini');

const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
const randomData = '56%'; // random bytes for testing
ipfs.add(randomData, (err, hash) => {
 if (err) {
   return console.log(err);
 }
 
 console.log('HASH:', hash);
});





