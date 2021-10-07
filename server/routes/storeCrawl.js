const express = require('express');
const crawlerKakao = require('../crawler/crawlerKakao');
const { Store, Menu, Review, StoreImg, sequelize, Count, Visit, Wish } = require('../models');
const util = require('util'); 
const EventEmitter = require('events').EventEmitter;

const router = express.Router();
/* Store's data ? post : crawling */
router.post('/', async (req, res) => {
  try {
    let { id, storeName, address, telephone, place_url, x, y } = req.body;

    const [storeData, created] = await Store.findOrCreate({
      where: { id: id },
      attributes: ['storeName', 'address', 'telephone', 'id', 'site', 'x', 'y'],
      defaults: {
        id: id,
        storeName: storeName,
        address: address,
        telephone: telephone,
        local:address&&address.split(" ")[0],
        x:x,
        y:y
      },
      order: [[Review, 'date', 'DESC']],
      include: [{
        model: Menu,
        attributes: ['tit', 'price'],
      },
      {
        model: Review,
        attributes: ['id', 'star', 'content', 'date', 'nickName', 'reviewImg','UserId'],
      },
      {
        model: StoreImg,
        attributes: ['imageUrl'],
        limit:3,
      },
      {
        model: Visit,
        attributes:  ['UserId']
      },
      {
        model: Wish,
        attributes:  ['UserId']
      }
      ]
    });
    /*crawling */
    if (created) {
      const crw = (await crawlerKakao({ id: id, url: place_url }));
      crw.getStore();
      crw.getReview();
      crw.getImg();
      return res.status(200).json(storeData);
    }
    else {
      return res.status(200).json(storeData);
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
/* store's review_count & average star */
router.post('/count', async (req, res) => {
  try {
    const store = req.body;
    var reviewData;
    await Count.findOne({
      where: { id: store.id },
      attributes: ['reviewCnt', 'avgStar']
    }).then(async res => {
      if (!res) {
        util.inherits(crawlerKakao, EventEmitter); 
        const crw = (await crawlerKakao({ id: store.id, url: store.url }));
        crw.setMaxListeners(50);
        await crw.getcnt().then(async res => { 
          reviewData=res
        });
      }
      else {
        reviewData=res.dataValues;
      }
    })
    return res.status(200).json(reviewData);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
module.exports = router;