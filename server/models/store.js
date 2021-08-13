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
      fullAddress: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      telephone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Store',
      tableName: 'Store',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Store.hasMany(db.Menu, { foreignKey: 'StoreId', sourceKey: 'id' });
    db.Store.hasMany(db.Review, { foreignKey: 'StoreId', sourceKey: 'id' });
  }
}