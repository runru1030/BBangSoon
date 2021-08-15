const Sequelize = require('sequelize');

module.exports = class StoreImg extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      imageUrl:{
        type:Sequelize.STRING(500),
        allowNull:false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'StoreImg',
      tableName: 'StoreImg',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.StoreImg.belongsTo(db.Store, { foreignKey: 'StoreId', targetKey: 'id' });
  }
}