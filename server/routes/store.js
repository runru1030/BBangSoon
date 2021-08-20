const express = require('express');
const { Store, Menu, Review, StoreImg , Count, sequelize} = require('../models');

const router = express.Router();
router.post('/list', async (req, res) => {
  try {
    const storeArr = req.body;
    const resultArr=[]
    storeArr.forEach(async(element, idx) => {
      await Review.findAll({
        where: { StoreId: element.id },
        attributes: [[sequelize.fn('count', sequelize.col('star')), 'reviewCnt'],[sequelize.fn('avg', sequelize.col('star')), 'avgStar'] ],
      
      }).then( async result => {
        const reviewData=result.map(res=>res.dataValues)[0];
        resultArr[idx]=reviewData;
       if (reviewData.avgStar == null) {
          
          await Count.findOne({
            where:{id:element.id},
            attributes:['reviewCnt', 'avgStar']
          }).then(res=>{
            resultArr[idx]=res?res.dataValues:reviewData;
          })
        }
        if(idx==storeArr.length-1){
          console.log(resultArr);
          return res.status(200).json(resultArr);
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
router.post('/review/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const {content, star, attach, nickName }=req.body;
    console.log({
      StoreId:id,
      nickName:nickName,
      content: content,
      star: star,
      date: new Date(),
    });
    await Review.create({
      StoreId:id,
      nickName:nickName,
      content: content,
      star: star,
      date: new Date(),
    })
    const storeData = await Store.findOne({
      where: { id: id },
      attributes: ['storeName','address', 'telephone', 'id'],
      order: [[Review, 'date', 'DESC']],
      include: [{
        model: Menu,
        attributes: ['tit', 'price'],
      },
      {
        model: Review,
        attributes: ['star', 'content', 'date', 'nickName', 'reviewImg'],
      },
      {
        model: StoreImg,
        attributes:  ['imageUrl'],
      }
    ]
    })
    const count = await Review.findAll({
      where: { StoreId: id },
      attributes: [[sequelize.fn('count', sequelize.col('star')), 'reviewCnt'],[sequelize.fn('avg', sequelize.col('star')), 'avgStar'] ],
    
    })
    console.log({
      ...storeData.dataValues,...count.map(res=>res.dataValues)[0]});
    return res.status(200).json({
      ...storeData.dataValues,...count.map(res=>res.dataValues)[0]});
    
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});

router.post('/image/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const storeImgs= await StoreImg.findAll({
      where: { StoreId: id },
      order: [[Review, 'date', 'DESC']],
      attributes: ['imageUrl'],
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json(storeImgs);
   
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.get('/rankReview/:local', async (req, res) => {
  try {
    let local = req.params.local;
    const storeRanking= await Store.findAll({
      where:[{local:local}],
      attributes:['id', 'storeName',
      [sequelize.fn('count', sequelize.col('Reviews.id')), 'reviewCnt'],
      [sequelize.fn('avg', sequelize.col('Reviews.star')), 'avgStar'],
      [sequelize.fn('sum', sequelize.col('Reviews.star')), 'totalStar'],
    ],
      include:[{
        model:Review,
        attributes:[]
      }], 
      group:['id'],
      order : [[sequelize.literal('totalStar'), 'DESC']],
    })
    
    return res.status(200).json(storeRanking.splice(0, 10));
   
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.post('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const storeData = await Store.findOne({
      where: { id: id },
      order: [[Review, 'date', 'DESC']],
      attributes: ['storeName','address', 'telephone', 'id'],
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
        limit:3,
      }
    ]
    })

    return res.status(200).json(storeData.dataValues);
   
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
module.exports = router;