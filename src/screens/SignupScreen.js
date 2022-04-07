import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';


import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    //useEffect() will be called whenn about to go to sign in
    useEffect(() => {
        navigation.addListener('blur', () =>{
            clearErrorMessage();
        });
    },[]);
    

    return(
        <View style={styles.containerStyle}>
            <AuthForm
                headerText="Sign up for Tracker App"
                errorMessage={state.errorMessage}
                submitButtonText="Sign up"
                onSubmit={signup}
            />
            <NavLink 
                linkText="Already have an account? Sign in instead!"
                screenRouteName="Signin"
            />
        </View>
    );
};



const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    }
});

export default SignupScreen;