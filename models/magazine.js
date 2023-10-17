const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('../models/index');
const Magazine = sequelize.define('magazinetable',{
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  }  ,
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publish_date: {
    type: DataTypes.DATE
  },
  pdf: {
    type: DataTypes.STRING(255)
  }
  
}, {
  timestamps: false,
  id: false
})
module.exports = Magazine;