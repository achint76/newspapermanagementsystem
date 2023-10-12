
const sequelize = require('../db/config')
const User = require('./users');
const Session = require('./sessions');
sequelize.sync({alter: true});

module.exports = {
    User,
    Session
}