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
      local: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      site: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      x: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      y: {
        type: Sequelize.FLOAT,
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
    db.Store.hasMany(db.StoreImg, { foreignKey: 'StoreId', sourceKey: 'id' });
  }
}