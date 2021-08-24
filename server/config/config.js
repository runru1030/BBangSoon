require('dotenv').config();
module.exports = {
    "development": {
      "username": "root",
      "password": process.env.SEQUELIZE_PASSWORD,
      "database": "bbangsoon",
      "host": "52.78.91.104",
      "dialect": "mysql",
      "operatorAliases" : false,
      "logging": false
    }
  };
/* module.exports = {
  "development": {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "dopdop_dev",
    host: "3.35.167.4",
    dialect: "mysql"
  },
  "test": {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "dopdop_test",
    host: "3.35.167.4",
    dialect: "mysql"
  },
  "production": {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "dopdop",
    host: "3.35.167.4",
    dialect: "mysql",
    logging: false,
  }
}; */