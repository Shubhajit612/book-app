const Sequelize = require('sequelize');

const sequalize = require('../util/database');

const User = sequalize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allownull: false,
        primaryKey:true,
    },
    name:Sequelize.STRING,
    phone:{
        type:Sequelize.STRING,
        unique:true,
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
    },
   
});

module.exports = User;