const express = require('express');
const router = express.Router();

// IPFS
router.get('/', function(req, res) {
    res.send('respond with a resource');
  });
  
  module.exports = router;