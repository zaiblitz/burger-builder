import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-e66ea.firebaseio.com/'
});

export default instance;