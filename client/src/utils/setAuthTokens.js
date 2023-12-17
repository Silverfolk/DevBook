// ye ek function jo token lega agar token hoga toh header mai daalega other wise nhi daalega
import axios from 'axios';

const setAuthTokens= (token) =>{
 if(token){
    axios.defaults.headers.common={'Authorization': `Bearer ${token}`};
    console.log(axios.defaults.headers.common);
 }else{
    delete axios.defaults.headers.common;
 }
}

export default setAuthTokens;