// imports
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Post extends Sequelize.Model { };

  Post.init({

    id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    content: {

      type: DataTypes.STRING(300),
      allowNull: false

    },
    likes: {

      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0

    }

  }, {

      sequelize,
      modelName: 'post'

    });

  Post.associate = (models) => {

    Post.belongsTo(models.user, {

      foreignKey: {

        allowNull: false,
        field: 'author',
        name: 'author'

      } 

    })

  }

  return Post;

}
