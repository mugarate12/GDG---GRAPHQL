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

}

module.exports = friendResolvers;