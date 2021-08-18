const Sequelize = require('sequelize');

module.exports = class Count extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      avgStar: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      reviewCnt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Count',
      tableName: 'Count',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
}