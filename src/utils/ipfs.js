const express = require('express');
const router = express.Router();
const Ipfs = require('ipfs-mini');

export const ipfs = new Ipfs({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

// hashing the data
 ipfs.add(PublishingData, (err, hash) => {
  if (err) {
    return console.log(err);
  }

  console.log('HASH:', hash);
});



// retrieving the data
// const hash = “Qmaj3ZhZtHynXc1tpnTnSBNsq8tZihMuV34wAvpURPZZMs”;
// ipfs.cat(hash, (err, data) => {
//  if (err) {
//    return console.log(err);
//  }
//
//  console.log(“DATA:”, data);
// });




