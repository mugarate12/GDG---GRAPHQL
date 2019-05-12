// import types

const INITIAL_STATE = {

  test: ''

};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'Teste':
      return { ...state }
    default:
      return state;
  }

}