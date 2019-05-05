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
      // let id = 1;

      return db.like
        .findAndCountAll({

          where: { idPost: idPost }

        })
        .then((result) => {

          return result.count

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
      let { first = 10, offset = 0 } = args;

      return db.friend
        .findAll({

          where: { idUser: id }

        })
        .then((friendListInstance) => {

          let ids = [];

          // resolver isso

          for(let i = 0; i<Object.keys(friendListInstance).length;i++){

            ids.push(friendListInstance[i].dataValues.idFriend)
            console.log(ids.push(friendListInstance[i].dataValues.idFriend))
          
          }
          // console.log(friendListInstance);
          // console.log(Object.keys(friendListInstance).length);
          // console.log(friendListInstance[1].dataValues.idFriend);
          console.log(ids);

          return db.post
            .findAll({

              where: { author: ids },
              limit: first,
              offset: offset

            });

        })

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

      // id vindo do token
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

      // id vindo do token
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

          if (!likeInstance) throw new Error(`User can't unlike a/one post which it has never liked`);


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

        })

    }

  }

};

module.exports = postResolvers;