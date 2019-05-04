// imports
const Sequelize = require('sequelize');

// meus imports

module.exports = (sequelize, DataTypes) => {

  class Friend extends Sequelize.Model { };

  Friend.init({
    idFriend: {

      type: DataTypes.INTEGER,
      allowNull: false

    },
    idUser: {

      type: DataTypes.INTEGER,
      allowNull: false

    }
  },{
    sequelize,
    modelName: 'friend'
  });

  // Friend.associate = (models) => {

  //   Friend.belongsTo(models.user, {

  //     foreignKey: {

  //       allowNull: false,
  //       field: 'idUser',
  //       name: 'idUser'
        
  // //     }

  // //   });

  // };

  return Friend;

}

