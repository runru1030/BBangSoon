const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      star: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      date:{
        type:Sequelize.STRING(12),
        allowNull:false
      },
      nickName:{
        type:Sequelize.STRING(15),
        allowNull:false
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Review',
      tableName: 'Review',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Review.belongsTo(db.Store, { foreignKey: 'StoreId', targetKey: 'id' });
  }
}