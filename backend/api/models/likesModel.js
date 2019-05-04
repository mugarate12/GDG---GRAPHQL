// imports
const Sequelize = require('sequelize');

// meus imports

module.exports = (sequelize, DataTypes) => {

  class Like extends Sequelize.Model { };

  Like.init({
    idUser: {

      type: Sequelize.DataTypes.INTEGER,
      allowNull: false

    }
  },{
    sequelize,
    modelName: 'like'
  });

  Like.associate = (models) => {

    Like.belongsTo(models.post, {

      foreignKey: {

        allowNull: false,
        field: 'idPost',
        name: 'idPost'

      }

    });

  }

  return Like;

}
