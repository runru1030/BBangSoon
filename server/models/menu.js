const Sequelize = require('sequelize');

module.exports = class Menu extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      tit: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Menu',
      tableName: 'Menu',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Menu.belongsTo(db.Store, { foreignKey: 'StoreId', targetKey: 'id' });
  }
}