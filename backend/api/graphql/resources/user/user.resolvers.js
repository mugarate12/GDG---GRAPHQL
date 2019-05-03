// meus imports

const userResolvers = {

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

      let { id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.user
        .findByPk(id)
        .then((userInstance) => {

          if (!userInstance) throw new Error(`user with id ${id} not found`);

          return userInstance

        });

    }

  },
  Mutation: {

    createUser: (parent, args, context, info) => {

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

              });

          });

      });

    },
    updateUserProfile: (parent, args, context, info) => {

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

              });

          });

      });

    },
    deleteUser: (parent, args, context, info) => {

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

    }


  }

};

module.exports = userResolvers;