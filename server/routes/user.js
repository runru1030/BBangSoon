const express = require('express');
const { User, Review, StoreImg, Visit, Wish, Store, Sequelize, sequelize } = require('../models');
const Op = Sequelize.Op;
const router = express.Router();
router.get('/wishArr/:userId', async (req, res) => {
  try {
    let userId = req.params.userId;
    const wishData = await Wish.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']],
      include: {
        model: Store,
        attributes: ['id'],
      }
    });
    const idArr = wishData.map(it => it.Store.id)
    const storeArr = await Store.findAll({
      where: { id: { [Op.in]: idArr } },
      attributes: ['id', 'storeName', [sequelize.fn('count', sequelize.col('Reviews.star')), 'reviewCnt'],
        [sequelize.fn('avg', sequelize.col('Reviews.star')), 'avgStar'],
      ],
      group: ['id'],
      include: { model: Review },
    })
    return res.status(200).json(storeArr);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.get('/feed/:id', async (req, res) => {
  try {
    let id = req.params.id
    const reviewData = await Review.findAll({
      where: { UserId: id },
      attributes: ['id', 'star', 'content', 'date', 'reviewImg', 'StoreId'],
      order: [['date', 'DESC']]
    });
    const visitData = await Visit.findAll({
      where: { UserId: id },
      attributes: ['StoreId'],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json({
      Reviews: reviewData.map(it => it.dataValues
      ), Visits: visitData
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.get('/visit/:userId/:storeId', async (req, res) => {
  try {
    let userId = req.params.userId
    let storeId = req.params.storeId
    await Visit.create({
      UserId: userId,
      StoreId: storeId
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.delete('/visit/:userId/:storeId', async (req, res) => {
  try {
    let userId = req.params.userId
    let storeId = req.params.storeId
    await Visit.destroy({
      where: {
        UserId: userId,
        StoreId: storeId,
      },
    });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});

router.get('/wish/:userId/:storeId', async (req, res) => {
  try {
    let userId = req.params.userId
    let storeId = req.params.storeId
    await Wish.create({
      UserId: userId,
      StoreId: storeId
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.delete('/wish/:userId/:storeId', async (req, res) => {
  try {
    let userId = req.params.userId
    let storeId = req.params.storeId
    await Wish.destroy({
      where: {
        UserId: userId,
        StoreId: storeId,
      },
    });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
router.patch("/nickName/:id/:new", async (req, res) => {
  try {
    let userId = req.params.id;
    let nickName = req.params.new;
    await User.update({ nickName: nickName }, { where: { id: userId } });
    return res.status(200).json({
      success: true,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });

  }
})
module.exports = router;