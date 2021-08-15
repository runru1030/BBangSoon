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
        type:'TIMESTAMP',
        allowNull:false
      },
      nickName:{
        type:Sequelize.STRING(15),
        allowNull:false
      },
      reviewImg:{
        type:Sequelize.STRING(200),
        allowNull:true,
      },
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