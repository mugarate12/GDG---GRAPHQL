import Axios from 'axios';

const instance = Axios.create({

  baseURL: 'http://10.0.2.2:3000',
  headers: {

    'Content-Type': 'application/json'

  }

})

export default instance;