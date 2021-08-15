const express = require('express');
const crawlerKakao = require('../crawler/crawlerKakao');
const { Store, Menu, Review, StoreImg, sequelize } = require('../models');

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    let { id, storeName,address,telephone, url } = req.body;
    const [storeData, created] = await Store.findOrCreate({
      where: { id: id },
      attributes: ['storeName','address', 'telephone', 'id'],
      defaults:{
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
        attributes:  ['imageUrl'],
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
    else{
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
    const resultArr=[]
    storeArr.forEach(async(element, idx) => {
      await Review.findAll({
        where: { StoreId: element.id },
        attributes: [[sequelize.fn('count', sequelize.col('star')), 'reviewCnt'],[sequelize.fn('avg', sequelize.col('star')), 'avgStar'] ],
      
      }).then(result => {
       if (result != null) {
          const reviewData=result.map(res=>res.dataValues);
          resultArr[idx]=reviewData;
        } 
      });
      if(idx==storeArr.length-1){
        console.log(resultArr);
        return res.status(200).json(resultArr);

      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});

module.exports = router;