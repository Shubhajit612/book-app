const Sequelize = require('sequelize');  //sequelize

const sequalize = new Sequelize('myuser',
'root','Toton@612',
{dialect:'mysql',
host:'localhost'
});

module.exports = sequalize;