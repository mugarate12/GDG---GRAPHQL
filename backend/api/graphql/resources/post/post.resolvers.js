// meus imports

const postResolvers = {

  Post: {

    author: (parent, args, context, info) => {

      let { db } = context;

      return db.user
        .findByPk(parent.get('author'))
        .then((userInstance) => {

          return userInstance

        });

    },
    likes: (parent, args, context, info) => {

      let { db } = context;
      let idPost = parent.get('id');

      // id mokado
      let id = 1;

      return db.like
        .findAll({

          where: { idUser: id, idPost: idPost }

        })

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

          return postInstance

        });

    },
    postByFriends: (parent, args, context, info) => {

      // // ids que irão vir do User.friends
      // let ids = [ 1, 3 ];
      // id mokado
      let id = 1;

      let { db } = context;

      return db.post
        .findAll({

          // esse operador ta bugando. Por que?
          // Ta mais não, nem precisava

          where: { author: ids }

        });

      // return db.friend
      //   .findAll({

      //     where: { idUser: id },
      //     attributes: ['idFriend']

      //   })

    }

  },
  Mutation: {

    createPost: (parent, args, context, info) => {

      let { input } = args;
      let { db } = context;

      // resolver isso, com autenticação no token
      input.author = 3;

      return db.sequelize.transaction((Transaction) => {

        return db.post
          .create(input, {

            transaction: Transaction
            
          });

      });

    },
    updatePost: (parent, args, context, info) => {

      let { input, id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.post
          .findByPk(id)
          .then((postInstance) => {

            // capturar o erro

            return postInstance
              .update(input, {

                transaction: Transaction

              });

          });

      });

    },
    deletePost: (parent, args, context, info) => {

      let { id } = args;
      id = parseInt(id);

      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.post
          .findByPk(id)
          .then((postInstance) => {

            // capturar erro

            return postInstance
              .destroy({

                transaction: Transaction

              })
              .then((postRemoved) => {

                return !!postRemoved

              });

          });

      });
      
    },
    likeOrUnlike: (parent, args, context, info) => {

      // implementar isso de acordo com o id do user que ta curtindo


    }

  }

};

module.exports = postResolvers;