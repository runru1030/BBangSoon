const express = require('express');
const crawler = require('../crawler/crawler');
const { Store, Menu } = require('../models');

const router = express.Router();
router.post('/', async (req, res) => {
    try{
        let {storeName, address}= req.body;
        const crawler=crawler(storeName, address);
        const storeData = await Store.findOne({
        where: { address: address },
        attributes: ['storeName', 'address', 'telephone'],
        include: [{
            model: Menu,
            attributes: ['tit', 'price'],
          }],
      });
      if(!storeData){
        storeData = crawler.getStore();
        storeData = await Store.findOne({
          where: { address: address },
          attributes: ['storeName', 'address', 'telephone'],
          include: [{
              model: Menu,
              attributes: ['tit', 'price'],
            }],
        });
    }
      
      return res.status(200).json(storeData);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.toString(),
      });
    }
  });
  
  module.exports = router;