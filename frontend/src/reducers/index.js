import { combineReducers } from 'redux';

// import reducers
import appReducer from './appReducer';
import signOrsingup from './signinOrsingupReducer';

export default combineReducers({

  appReducer,
  signOrsingup

});