import axios from 'axios';

const apiUrl = process.env.REACT_APP_URL;
console.log(process.env.REACT_APP_URL);
export default axios.create({

    baseURL:apiUrl
})