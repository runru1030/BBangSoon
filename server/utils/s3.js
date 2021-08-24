
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const path = require('path');

const s3 = new aws.S3({
  accessKeyId: process.env.S3_KEYID, 
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.REGION, 
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bbangsoon', // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname)
      cb(null, file.fieldname + '/' + Date.now().toString()+extension);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 용량 제한
}); 
module.exports = upload;