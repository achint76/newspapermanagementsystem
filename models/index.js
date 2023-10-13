
const sequelize = require('../db/config')
const User = require('./users');
const Session = require('./sessions');
const Newspaper = require('./newspaper');
sequelize.sync({alter: true});

module.exports = {
    User,
    Session,
    Newspaper
}