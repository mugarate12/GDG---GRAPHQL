// meus imports

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

        });

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

          return userInstance

        })

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

      });

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

            if (!userInstance) throw new Error(`user with id ${id} not found`);

            return userInstance
              .update(input, {

                transaction: Transaction

              }).then((userInstanceUpdated) => {

                return !!userInstanceUpdated

              });

          });

      });

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

            if (!userInstance) throw new Error(`user with id ${id} not found`);

            return userInstance
              .update(input, {

                transaction: Transaction

              }).then((userInstanceUpdated) => {

                return !!userInstanceUpdated

              });

          });

      });

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

            if (!userInstance) throw new Error(`user with id ${id} not found`);

            return userInstance.destroy({

              transaction: Transaction

            })
              .then((userRemoved) => {

                return !!userRemoved

              });

          });

      })

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

        if(!!friendInstance) throw new Error(`user can't add a friend two times`);

        return db.sequelize.transaction((Transaction) => {

          return db.friend
            .create(input, {

              transaction: Transaction

            })
            .then((friendAdded) => {

              return !!friendAdded

            })

        })

      })

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

          if (!friendInstance) throw new Error(`user can't remove a friend which it has never added`);

          return db.sequelize.transaction((Transaction) => {

            return friendInstance.destroy({

              transaction: Transaction

            })
            .then((friendRemoved) => {

              return !!friendRemoved

            })

          })

        })

    }


  }

};

module.exports = userResolvers;