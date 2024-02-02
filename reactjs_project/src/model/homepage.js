import axios from 'axios';

export const getdata = (search_query, page) => {
    axios.get(`http://127.0.0.1:8000/getdata?search_query=${search_query}&page=${page}`)
    .then((response) => {
        return response.data
    })
    .catch((error) =>{
        console.log(error);
        window.makeAlert('error', 'Error', error)
    })
}