
const sequelize = require('../db/config')
const User = require('./users');
const Session = require('./sessions');
const Newspaper = require('./newspaper');
const Magazine = require('./magazine');
sequelize.sync({alter: true});

module.exports = {
    User,
    Session,
    Newspaper,
    Magazine
}