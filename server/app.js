const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');

dotenv.config();

const storeRouter = require('./routes/store');
const storeCrawlRouter = require('./routes/storeCrawl');
const logger = require('./logger');
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);


sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch(err => {
        console.error(err);
    });


if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use('/store', storeRouter);
app.use('/storeCrawl', storeCrawlRouter);
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    logger.error(error.message);
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

app.listen(app.get('port'), 5000, () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
