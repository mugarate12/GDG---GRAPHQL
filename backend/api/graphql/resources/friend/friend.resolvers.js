// imports

// meus imports

const friendResolvers = {

  Friend: {},
  Query: {

    friends: (parent, args, context, info) => {

      let { db } = context;

      // mocar o id do user, todavia, virá do token
      let id = 1;

      return db.friend
        .findAll({

          where: {

            idUser: id

          }

        })

    }

  },
  Mutation: {

    createFriend: (parent, args, context, info) => {

      let { input } = args;

      // mocado, isso virá do token
      let id = 1;
      input.idUser = id;

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.friend
          .create(input, {

            transaction: Transaction

          });

      });

    },
    deleteFriend: (parent, args, context, info) => {

      let { input } = args;

      // irá vir do token
      let id = 1;

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.friend
          .findOne({
            where: { idUser: id, idFriend: input.idFriend }
          })
          .then((friendInstance) => {

            return friendInstance
              .destroy({

                transaction: Transaction

              })
              .then((friendRemoved) => {

                return !!friendRemoved

              });

          });

      });

    }

  },

}

module.exports = friendResolvers;