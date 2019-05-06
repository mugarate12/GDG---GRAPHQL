// meus imports
const { handleError, throwError } = require('./../../../utils/utils');

const postResolvers = {

  Post: {

    author: (parent, args, context, info) => {

      let { db } = context;

      return db.user
        .findByPk(parent.get('author'))
        .then((userInstance) => {

          return userInstance

        })
        .catch((error) => handleError(error));

    },
    likes: (parent, args, context, info) => {

      let { db } = context;
      let idPost = parent.get('id');

      // id mokado
      // let id = 1;

      return db.like
        .findAndCountAll({

          where: { idPost: idPost }

        })
        .then((result) => {

          return result.count

        })
        .catch((error) => handleError(error));

    }

  },

  Query: {

    post: (parent, args, context, info) => {

      let { id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.post
        .findByPk(id)
        .then((postInstance) => {

          // capturar o erro
          throwError(!postInstance, `post with id ${id} not found`);

          return postInstance

        })
        .catch((error) => handleError(error));

    },
    postByFriends: (parent, args, context, info) => {

      // id mokado
      let id = 1;

      let { db } = context;
      let { first = 10, offset = 0 } = args;

      return db.friend
        .findAll({

          where: { idUser: id }

        })
        .then((friendListInstance) => {

          let ids = [];

          // resolver isso

          for (let i = 0; i < Object.keys(friendListInstance).length; i++) {

            ids.push(friendListInstance[i].dataValues.idFriend)

          }

          return db.post
            .findAll({

              where: { author: ids },
              limit: first,
              offset: offset,
              order: [['updatedAt']]

            })
            .catch((error) => handleError(error));

        })
        .catch((error) => handleError(error));

    }

  },
  Mutation: {

    createPost: (parent, args, context, info) => {

      let { input } = args;
      let { db } = context;

      // resolver isso, com autenticação no token
      input.author = 1;

      return db.sequelize.transaction((Transaction) => {

        return db.post
          .create(input, {

            transaction: Transaction

          });

      })
        .catch((error) => handleError(error));

    },
    updatePost: (parent, args, context, info) => {

      // em baixo to pegando o id do post, tenho que aqui pegar o id do user pelo token pra passar num findOne
      let idUSer = 1;

      // id do post
      let { input, id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.post
          .findOne({

            where: { author: idUSer, id: id }

          })
          .then((postInstance) => {

            // capturar o erro
            throwError(!postInstance, `post with id ${id} not found`);

            return postInstance
              .update(input, {

                transaction: Transaction

              });

          });

      })
        .catch((error) => handleError(error));

    },
    deletePost: (parent, args, context, info) => {

      // em baixo to pegando o id do post, tenho que aqui pegar o id do user pelo token pra passar num findOne
      let idUser = 1;

      // id do post
      let { id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.post
          .findOne({

            where: { author: idUser, id: id }

          })
          .then((postInstance) => {

            // capturar erro
            throwError(!postInstance, `post with id ${id} not found`);

            return postInstance
              .destroy({

                transaction: Transaction

              })
              .then((postRemoved) => {

                return !!postRemoved

              })
              .catch((error) => handleError(error));

          });

      })
        .catch((error) => handleError(error));

    },
    addLike: (parent, args, context, info) => {

      // id vindo do token
      let id = 1;

      let { db } = context;
      let { idPost } = args;

      return db.like
        .findOne({

          where: { idUser: id, idPost: idPost }

        })
        .then((likeInstance) => {

          // como truthy, isso retorna true(likeInstance) quando já existe um documento com esse idUser
          // localStorage, somente entra no if quando já existe
          // if (!!likeInstance) throw new Error(`user can't like two times`);
          throwError(!!likeInstance, `user can't like two times`);

          return db.sequelize.transaction((Transaction) => {

            return db.like
              .create({ idPost: idPost, idUser: id }, {

                transaction: Transaction

              })
              .then((likeCreated) => {

                return !!likeCreated

              });

          })

        })
        .catch((error) => handleError(error));

    },
    removeLike: (parent, args, context, info) => {

      // id vindo do token
      let id = 1;

      let { db } = context;
      let { idPost } = args;

      return db.like
        .findOne({

          where: { idPost: idPost, idUser: id }

        })
        .then((likeInstance) => {

          // if (!likeInstance) throw new Error(`User can't unlike a/one post which it has never liked`);
          throwError(!likeInstance, `User can't unlike a/one post which it has never liked`);

          // console.log(!likeInstance);

          return db.sequelize.transaction((Transaction) => {

            return likeInstance
              .destroy({

                transaction: Transaction

              })
              .then((likeRemoved) => {

                return !!likeRemoved;

              });

          })
            .catch((error) => handleError(error));

        })
        .catch((error) => handleError(error));

    }

  }

};

module.exports = postResolvers;