const sequelize = require('../db/config');
const {DataTypes} = require('sequelize');
const moment = require('moment');
const Session = sequelize.define('sessionstable',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    login: {
        type: DataTypes.DATE,
        //allowNull: false,
        
    },
    logout: {
        type: DataTypes.DATE,
        //allowNull: false
    },
    expiry: {
        type: DataTypes.DATE
    }
})
// }, {
//     // timestamps:false,
//     // id: false 
// })
module.exports = Session;