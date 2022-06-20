'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    order_total_price: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  Order.associate = function(models) {
    Order.hasMany(models.Item, {
      foreignKey : 'item_id',
      as : 'item'
    })
    Order.belongsTo(models.User, {
      foreignKey : 'user_id',
      as : 'user'
    })
  }
  return Order;
};