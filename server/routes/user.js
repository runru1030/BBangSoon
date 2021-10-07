const express = require('express');
const { User, Review, StoreImg, Visit, Wish, Store, Sequelize, sequelize } = require('../models');
const Op = Sequelize.Op;
const router = express.Router();
/* user's wish list */
router.get('/wishArr/:userId', async (req, res) => {
  try {
    let userId = req.params.userId;
    const wishData = await Wish.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']],
      attributes:[],
      include: {
        model: Store,
        attributes: ['id'],
      }
    });
    const idArr = wishData.map(it => it.Store.id);
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
/* user's reivew & visit_list*/
router.get('/feed/:userId', async (req, res) => {
  try {
    let userId = req.params.userId
    const reviewData = await Review.findAll({
      where: { UserId: userId },
      attributes: ['id', 'star', 'content', 'date', 'reviewImg', 'StoreId'],
      order: [['date', 'DESC']]
    });
    const visitData = await Visit.findAll({
      where: { UserId: userId },
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
/* Add visit_list */
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
/* Delete visit_list */
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
/* Add wish_list */
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
/* Delete wish_list */
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
/* Edit user's nickName */
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