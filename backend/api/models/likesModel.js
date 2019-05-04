// imports
const Sequelize = require('sequelize');

// meus imports

module.exports = (sequelize, DataTypes) => {

  class Like extends Sequelize.Model { };

  Like.init({
    idUser: {

      type: Sequelize.DataTypes.INTEGER,
      allowNull: false

    },
    idPost: {

      type: DataTypes.INTEGER,
      allowNull: false

    }
  },{
    sequelize,
    modelName: 'like'
  });

  return Like;

}
