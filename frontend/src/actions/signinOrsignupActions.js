// import types
import {
  SIGNUP
} from './types';

import axiosInstance from './../config/axiosConfig';
// coloca o async await nisso e da certo no component
export const signup = (name, username, email, password) => {

  return dispatch => {

    let query = `
    mutation{
      createUser(input: {
        name: "${name}",
        username: "${username}",
        email: "${email}",
        password: "${password}"
      }){
        token
      }
    }
    `;

    let variables = {};

    axiosInstance.post('/graphql', JSON.stringify({ query, variables }))
      .then((response) => {

        console.log('chgou aqui');

        return dispatch({
          type: SIGNUP,
          payload: response.data.data.createUser.token
        })

      }).catch((err) => {

        console.log(`${err.name} : ${err.message}`);

      })

  }
}
