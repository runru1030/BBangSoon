const express = require('express');
const { Store, Menu, Review, StoreImg } = require('../models');

const router = express.Router();
router.post('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const storeData = await Store.findOne({
      where: { id: id },
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
      }
    ]
    }).then(result => {
      if (result==null) {
        return res.status(200).json(null);
      }
      else{
        return res.status(200).json(result.dataValues);
      }
    });

    //return res.status(200).json(storeData);
   
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});


module.exports = router;