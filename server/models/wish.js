const Sequelize = require('sequelize');

module.exports = class Wish extends Sequelize.Model {
  static init(sequelize) {
    return super.init({}, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Wish',
      tableName: 'Wish',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Wish.belongsTo(db.Store, { foreignKey: 'StoreId', targetKey: 'id' });
    db.Wish.belongsTo(db.User, { foreignKey: 'UserId', targetKey: 'id' });
  }
}