const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const Store = require('./store');
const Menu = require('./menu');
const Review = require('./review');
const StoreImg = require('./storeImg');
const Count = require('./count');

const db = {};
const sequelize = new Sequelize(config.database, config.user, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Store = Store;
db.Menu = Menu;
db.Review = Review;
db.StoreImg= StoreImg;
db.Count= Count;

Store.init(sequelize);
Menu.init(sequelize);
Review.init(sequelize);
StoreImg.init(sequelize);
Count.init(sequelize);

Store.associate(db);
Menu.associate(db);
Review.associate(db);
StoreImg.associate(db);

module.exports = db;