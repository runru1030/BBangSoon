const Sequelize = require('sequelize');

module.exports = class Store extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      storeName: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      telephone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Store',
      tableName: 'store',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Store.hasMany(db.Menu, { foreignKey: 'storeId', sourceKey: 'id' });
    db.Store.hasMany(db.Review, { foreignKey: 'storeId', sourceKey: 'id' });
  }
}