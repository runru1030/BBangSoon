const express = require('express');
const crawlerKakao = require('../crawler/crawlerKakao');
const { Store, Menu, Review, StoreImg, sequelize, Count } = require('../models');

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    let { id, storeName, address, telephone, url } = req.body;
    const [storeData, created] = await Store.findOrCreate({
      where: { id: id },
      attributes: ['storeName', 'address', 'telephone', 'id'],
      defaults: {
        id: id,
        storeName: storeName,
        address: address,
        telephone: telephone
      },
      include: [{
        model: Menu,
        attributes: ['tit', 'price'],
      },
      {
        model: Review,
        attributes: ['star', 'content', 'date', 'nickName', 'reviewImg'],
        order: [
          ['date', 'DESC']],
      },
      {
        model: StoreImg,
        attributes: ['imageUrl'],
      }
      ]
    })
    if (created) {
      const crw = (await crawlerKakao({ id: id, url: url }));
      crw.getStore();
      crw.getReview();
      crw.getImg();
      return res.status(200).json(null);
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
router.post('/list', async (req, res) => {
  try {
    const storeArr = req.body;
    const resultArr = []
    await storeArr.forEach(async (element, idx) => {
      await Review.findAll({
        where: { StoreId: element.id },
        attributes: [[sequelize.fn('count', sequelize.col('star')), 'reviewCnt'], [sequelize.fn('avg', sequelize.col('star')), 'avgStar']],

      }).then(async result => {
        const reviewData = result.map(res => res.dataValues)[0];
        resultArr[idx] = reviewData;
        if (reviewData.avgStar == null) {
          await Count.findOne({
            where: { id: element.id },
            attributes: ['reviewCnt', 'avgStar']
          }).then(async res => {
            console.log(res);
            if (!res) {
              const crw = (await crawlerKakao({ id: element.id, url: element.url }));
              await crw.getcnt().then(async res => { resultArr[idx] = res });
            }
            else {
              resultArr[idx] = res.dataValues;
            }
          })
        }
        if (idx == storeArr.length - 1) {
          return res.status(200).json(resultArr)
        }
      });
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.post('/count', async (req, res) => {
  try {
    const store = req.body;
    var reviewData;
    await Review.findAll({
      where: { StoreId: store.id },
      attributes: [[sequelize.fn('count', sequelize.col('star')), 'reviewCnt'], [sequelize.fn('avg', sequelize.col('star')), 'avgStar']],

    }).then(async result => {
      if (result.map(res => res.dataValues)[0].avgStar == null) {
        await Count.findOne({
          where: { id: store.id },
          attributes: ['reviewCnt', 'avgStar']
        }).then(async res => {
          console.log(res);
          if (!res) {
            const crw = (await crawlerKakao({ id: store.id, url: store.url }));
            await crw.getcnt().then(async res => { 
              reviewData=res
            });
          }
          else {
            reviewData=res.dataValues;
          }
        })

      }
      else{
        reviewData=result.map(res => res.dataValues)[0];
      }
    })
    console.log(reviewData);
    return res.status(200).json(reviewData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
module.exports = router;