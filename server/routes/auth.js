const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Review } = require('../models');
const kakaoAuth = require('../utils/KakaoAuth');

const router = express.Router();
/* Create user or Read user */
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
      const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, {
        ignoreExpiration: true,
      });
      userEmail = user.email;
    }

    const [user, created] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        socialType: 'kakao',
        nickName: userNickName,
        kakaoToken: req.body.access_token
      },
      attributes: ['id', 'nickName'],
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
      await User.update({kakaoToken:req.body.access_token}, {where:{id:user.id}} )
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
/* logout user */
router.post('/logout', async (req, res) => {
  try{
    const jwtUser = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });
    const user= await User.findOne({where:{id:jwtUser.id},
    attributes:['kakaoToken']})
    await kakaoAuth.logout(user.kakaoToken);
    return res.status(200).json({success:true});
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});
module.exports = router;