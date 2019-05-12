// import types
import {
  SIGNUP
} from './../actions/types';

const INITIAL_STATE = {

  token: ''

};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SIGNUP:
      return { ...state, token: action.payload }
    default:
      return state;

  }

}