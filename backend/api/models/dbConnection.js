// imports
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// achar onde eu to
const basename = path.basename(module.filename);
const env = (parseInt(process.env.NODE_ENV) === 1) ? 'development' : 'production';

// peguei a configuração do banco conforme o config.json
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
// console.log(config);

let db = null;

if (!db) {

  db = {};

  const operatorsAlisses = {

    $in: Sequelize.Op.in,
    $and: Sequelize.Op.and

  };

  config = Object.assign({ operatorsAlisses }, config);

  const sequelize = new Sequelize(

    config.database,
    config.username,
    config.password,
    config

  );

  fs
    .readdirSync(__dirname)
    .filter((file) => {

      return (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');

    })
    .forEach((file) => {

      const model = sequelize.import(path.join(__dirname, file));

      db[model['name']] = model;

    });

  Object.keys(db).forEach((model) => {

    if (db[model].associate) {

      db[model].associate(db);

    }

  });

  db['sequelize'] = sequelize;

}

module.exports = db;
