const {Sequelize} = require('sequelize')
const db = require('./database/db.js')


const sequelize = new Sequelize( db.development.database, db.development.username, db.development.password, {
    host: db.development.host,
    port: db.development.port,
    dialect: db.development.dialect,
})


module.exports = sequelize;