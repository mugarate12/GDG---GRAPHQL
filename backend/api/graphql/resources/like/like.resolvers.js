// meus imports

const likeResolvers = {

  Query: {

    likes: (parent, args, context, info) => {

      let { db } = context;
      // let { idPost } = args;

      let id = 1;

      return db.like
        .findAll({

          where: { idUser: id },


        })
    
    }

  },
  Mutation: {

    like: (parent, args, context, info) => {

      // id mokado
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
          if (!!likeInstance) throw new Error(`user can't like two times`);

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
    },
    unlike: (parent, args, context, info) => {

      // id mokado
      let id = 1;

      let { db } = context;
      let { idPost } = args;

      return db.like
        .findOne({

          where: { idPost: idPost, idUser: id }

        })
        .then((likeInstance) => {

          if (!likeInstance) throw new Error(`User can't unlike a/one post which it has never liked`);

          return db.sequelize.transaction((Transaction) => {

            return db.likeInstance
              .destroy({

                transaction: Transaction

              })
              .then((likeRemoved) => {

                return !!likeRemoved;

              });

          })

          
        })

    }

  }

};

module.exports = likeResolvers;