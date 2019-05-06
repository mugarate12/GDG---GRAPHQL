// meus imports
const { handleError, throwError } = require('./../../../utils/utils');

const userResolvers = {

  User: {

    friends: (parent, args, context, info) => {

      let id = parent.get('id');

      let { db } = context;


      return db.friend
        .findAll({

          where: {

            idUser: id

          },
          // attributes: ['idFriend']

        })
        .catch((error) => handleError(error));

    },
    posts: (parent, args, context, info) => {

      let id = parent.get('id');

      let { db } = context;

      return db.post
        .findAll({

          where: { author: id }

        })
        .catch((error) => handleError(error));

    }

  },

  Query: {

    users: (parent, args, context, info) => {

      let { first = 10, offset = 0 } = args;
      let { db } = context;

      return db.user
        .findAll({

          limit: first,
          offset: offset

        })
        .catch((error) => handleError(error));

    },
    user: (parent, args, context, info) => {

      let { username } = args;

      let { db } = context;

      return db.user
        .findOne({

          where: { username: username }

        })
        .then((userInstance) => {

          // capturar o erro
          throwError(!!userInstance, `user instance with username ${username} not found`);

          return userInstance

        })
        .catch((error) => handleError(error));

    }

  },
  Mutation: {

    createUser: (parent, args, context, info) => {

      // isso tem que devolver um token

      let { input } = args;
      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.user
          .create(input, {

            transaction: Transaction

          });

      })
        .catch((error) => handleError(error));

    },
    updateUserPassword: (parent, args, context, info) => {

      // id vem do token
      let { input, id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.user
          .findByPk(id)
          .then((userInstance) => {

            // if (!userInstance) throw new Error(`user with id ${id} not found`);
            throwError(!userInstance, `user with id ${id} not found`)

            return userInstance
              .update(input, {

                transaction: Transaction

              }).then((userInstanceUpdated) => {

                return !!userInstanceUpdated

              });

          });

      })
        .catch((error) => handleError(error));

    },
    updateUserProfile: (parent, args, context, info) => {

      // id vem do token
      let { input, id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.user
          .findByPk(id)
          .then((userInstance) => {

            // if (!userInstance) throw new Error(`user with id ${id} not found`);
            throwError(!userInstance, `user with id ${id} not found`);

            return userInstance
              .update(input, {

                transaction: Transaction

              }).then((userInstanceUpdated) => {

                return !!userInstanceUpdated

              });

          });

      })
        .catch((error) => handleError(error));

    },
    deleteUser: (parent, args, context, info) => {

      // id vem do token
      let { id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.user
          .findByPk(id)
          .then((userInstance) => {

            // if (!userInstance) throw new Error(`user with id ${id} not found`);
            throwError(!userInstance, `user with id ${id} not found`);

            return userInstance.destroy({

              transaction: Transaction

            })
              .then((userRemoved) => {

                return !!userRemoved

              });

          });

      })
        .catch((error) => handleError(error));

    },
    addFriend: (parent, args, context, info) => {

      // mocado, isso virá do token
      let id = 1;

      let { idFriend } = args;

      let input = {};
      input.idFriend = idFriend;
      input.idUser = id;

      let { db } = context;

      return db.friend.findOne({

        where: { idUser: input.idUser, idFriend: input.idFriend }

      })
        .then((friendInstance) => {

          // if (!!friendInstance) throw new Error(`user can't add a friend two times`);
          throwError(!!friendInstance, `user can't add a friend two times`);

          return db.sequelize.transaction((Transaction) => {

            return db.friend
              .create(input, {

                transaction: Transaction

              })
              .then((friendAdded) => {

                return !!friendAdded

              })

          })
            .catch((error) => handleError(error));

        })
        .catch((error) => handleError(error));

    },
    removeFriend: (parent, args, context, info) => {

      let { db } = context;

      // id mokado, virá do token
      let id = 1;

      let { idFriend } = args;

      let input = {};
      input.idFriend = idFriend;
      input.idUser = id;

      return db.friend
        .findOne({

          where: { idUser: input.idUser, idFriend: input.idFriend }

        })
        .then((friendInstance) => {

          // if (!friendInstance) throw new Error(`user can't remove a friend which it has never added`);
          throwError(!friendInstance, `user can't remove a friend which it has never added`);

          return db.sequelize.transaction((Transaction) => {

            return friendInstance.destroy({

              transaction: Transaction

            })
              .then((friendRemoved) => {

                return !!friendRemoved

              })

          })
            .catch((error) => handleError(error));

        })
        .catch((error) => handleError(error));

    }


  }

};

module.exports = userResolvers;