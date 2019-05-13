// imports
const Sequelize = require('sequelize');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');

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
      unique: true,
      validate: {

        isEmail: true,

      }

    },
    about: {

      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null

    }

  },{
    sequelize,
    modelName: 'user',
    hooks: {

      beforeCreate: (userInstance, options) => {

        const salt = genSaltSync();

        userInstance.password = hashSync(userInstance.password, salt);

      },
      beforeUpdate: (userInstance, options) => {

        if (userInstance.changed('password')){

          const salt = genSaltSync();

          userInstance.password = hashSync(userInstance.password, salt);

        }

      }

    }
  });

  User.prototype.isPassword = (password, encodedPassword) => {
    
    return compareSync(password, encodedPassword);

  }
  

  return User;

}

