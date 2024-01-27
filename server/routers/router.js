const express = require('express');
const controller = require('../controllers/controller')
const router = express.Router();

router.post('/RegisterNFT', controller.RegisterNFT);
router.post('/nftSold',controller.NFT_Sold)

module.exports = router;