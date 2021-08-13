const express = require('express');
const crawler = require('../crawler/crawler');
const crawlerKakao = require('../crawler/crawlerKakao');
const { Store, Menu, Review } = require('../models');

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    let { storeName, address, url } = req.body;

    const storeData = await Store.findOne({
      where: { address: address },
      attributes: ['storeName', 'fullAddress', 'telephone', 'id'],
      include: [{
        model: Menu,
        attributes: ['tit', 'price'],
      }]
    }).then(result => {
      if (result != null) {
        return res.status(200).json(result.dataValues);
      }
    });

    if (storeData == null) {
      const crw = (await crawlerKakao({ storeName: storeName, address: address, url: url }));
      crw.getStore().then(async(resolve) => {
        console.log(resolve);
        const storeData_new = await Store.findOne({
          where: { address: address },
          attributes: ['storeName', 'fullAddress', 'telephone', 'id'],
          include: [{
            model: Menu,
            attributes: ['tit', 'price'],
          }]
        });
        return res.status(200).json(storeData_new);
      });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.post('/review', async (req, res) => {
  try {
    let { url, StoreId } = req.body;

    const reivew = await Review.findAll({
      where: { StoreId: StoreId },
      attributes: ['star', 'content', 'date', 'nickName'],
    }).then(result => {
      console.log(result.data);
      if (result.length) {
        return res.status(200).json(result);
      }
    });

    if (!reivew) {
      const crw = (await crawlerKakao({ url: url }));
      crw.getReview(StoreId).then(async(resolve) => {
        const reivew_new = await Review.findAll({
          where: { StoreId: StoreId },
          attributes: ['star', 'content', 'date', 'nickName'],
        })
        console.log(reivew_new);
        return res.status(200).json(reivew_new);
      });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
module.exports = router;