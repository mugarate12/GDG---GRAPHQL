// imports
const Sequelize = require('sequelize');

// meus imports

module.exports = (sequelize, DataTypes) => {

  class User extends Sequelize.Model { };

  User.init({

    id: {

      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    name: {

      type: Sequelize.STRING(128),
      allowNull: false

    },
    username: {

      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true

    },
    email: {

      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true

    },
    about: {

      type: Sequelize.STRING(300),
      allowNull: true,
      defaultValue: null

    }

  },{
    sequelize,
    modelName: 'user'
  })

  return User;

}

