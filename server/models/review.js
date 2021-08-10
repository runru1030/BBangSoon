const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      star: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      date:{
        type:Sequelize.DATE,
        allowNull:false
      },
      nickName:{
        type:Sequelize.STRING(15),
        allowNull:false
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Review',
      tableName: 'Review',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Review.belongsTo(db.Store, { foreignKey: 'storeId', targetKey: 'id' });
  }
}