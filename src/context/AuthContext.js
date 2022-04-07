import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from '@react-native-async-storage/async-storage'; //npm install @react-native-async-storage/async-storage

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload}; //update error message, but copy state objects since signup or sign in failed
        case 'sign_up':
            return { errorMessage: '', token: action.payload }; //sign_up was successful, so update errorMessage
        case 'sign_in':
            return {errorMessage: '', token: action.payload }; //sign_in was successful, so update errorMessage
        case 'sign_out':
            return {errorMessage: '', token: null};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => {
    return async (callback) => {
        const token = await AsyncStorage.getItem('token')
        if(token){
            dispatch({type: 'sign_in', payload: token});
        }
        else{
            //clear token just to be on the safe side
            dispatch({type: 'clear_token'});
        }
        if(callback){
            return callback();
        }
        return null;
    };
};

const signup = (dispatch) => async ({ email, password }) => {
        //make an api request to sign up with that email and password
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'sign_up', payload: response.data.token})
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
        }
        //if signed up is successfull, modify our state, and say that we are authenticated

        //if signing up fails, we need to display a message to user

    };

const signin = (dispatch) => async ({ email, password }) => {
        //make an api request to sign in with that email and password
        try {
            const response = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);//save token for future use
            dispatch({type: 'sign_in', payload: response.data.token});
        } catch (err) {
            //add error due to sign in issue
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            });
        }
        //if signed in is successfull, modify our state, and say that we are authenticated

        //if signing in fails, we need to display a message to user

};

const signout = (dispatch) => {
    return async () => {
        //signout
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'sign_out'
        })
    };
};

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({
          type: "clear_error_message",
        });
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);