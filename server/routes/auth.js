const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Review } = require('../models');
const kakaoAuth = require('../utils/kakaoAuth');

const router = express.Router();

router.post('/kakao', async (req, res) => {
  try{
    let userEmail = "";
    let userNickName = "";
    if (req.body.access_token) {
      const result = await kakaoAuth.getProfile(req.body.access_token);
      const kakaoUser = JSON.parse(result).kakao_account;
      userEmail = kakaoUser.email;
      userNickName = kakaoUser.profile.nickname;
    } else {
      console.log(req.headers.authorization)
      const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, {
        ignoreExpiration: true,
      });
      userEmail = user.email;
    }

    console.log(userEmail,userNickName);
    const [user, created] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        socialType: 'kakao',
        nickName: userNickName,
      },
      attributes: ['id', 'nickName'],
       include: [{
        model: Review,
        attributes: ['star', 'content', 'date', 'reviewImg', 'StoreId'],
      }], 
    });

    let responseData = {
      success: true,
      user,
    };

    if (req.body.access_token) {
      const token = jwt.sign({
        id: user.id,
        email: userEmail,
      }, process.env.JWT_SECRET, {
        issuer: 'bbangsoon',
      });

      responseData.jwt = token;
    }

    return res.status(created? 201: 200).json(responseData);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});

module.exports = router;