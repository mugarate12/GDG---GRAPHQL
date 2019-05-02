// imports
const Sequelize = require('sequelize');

// meus imports

module.exports = (sequelize, DataTypes) => {

  class User extends Sequelize.Model { };

  User.init({

    id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    name: {

      type: DataTypes.STRING(128),
      allowNull: false

    },
    username: {

      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true

    },
    password: {

      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {

        notEmpty: true

      }

    },
    email: {

      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true

    },
    about: {

      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null

    }

  },{
    sequelize,
    modelName: 'user'
  })

  return User;

}

