const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    T1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    T2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    T3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Event',
  }
);

module.exports = Event;
