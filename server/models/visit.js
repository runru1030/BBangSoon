const Sequelize = require('sequelize');

module.exports = class Visit extends Sequelize.Model {
  static init(sequelize) {
    return super.init({}, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Visit',
      tableName: 'Visit',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Visit.belongsTo(db.Store, { foreignKey: 'StoreId', targetKey: 'id' });
    db.Visit.belongsTo(db.User, { foreignKey: 'UserId', targetKey: 'id' });
  }
}