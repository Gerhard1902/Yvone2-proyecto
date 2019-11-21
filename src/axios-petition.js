import axios from 'axios';
const instance= axios.create({
    baseURL:'https://api-mongod.herokuapp.com/'
});

export default instance;