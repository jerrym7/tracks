import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; //npm install @react-native-async-storage/async-storage


//using ngrok to expose my server port, (change this every 8 hours due to ngrok), first check if ngrok is installed by running 'ngrok', if no, 'npm install -g ngrok'
//to expose a port from localhost run 'ngrok http 3000' 'ngrok http <port_number>
const instance = axios.create({
    baseURL: 'YOUR_API_URL'
});

/**
 * This will add a header if we have a token only, we will be adding a Authorization header to our instance before running the http req
 */
instance.interceptors.request.use(
    async (config) => {//this will be called before doing the http request, it is async because to retrieve the storage it is async
        const token = await AsyncStorage.getItem('token'); //get token from storage
        if(token){//if there is a token
            config.headers.Authorization = `Bearer ${token}`; //add a header with Bearer TOKEN_KEY
        }
        return config//return config if modified
    }, 
    (err) => { //called when there is any error when making a request (not on the response) from the git go (ex. no internet connection). 
        return Promise.reject(err); //takes err and returns new promise by default is rejected by the err object
    }
);

export default instance;
