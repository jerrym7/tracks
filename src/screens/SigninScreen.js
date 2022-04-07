import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
//import { NavigationEvents } from '@react-navigation/native'; //same as adding a listener 'didFocus' like on previous project for blogpost app for React Navigation V4.x
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';


/**
 * 
 * @returns 
 */
const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    //useEffect() will be called whenn about to go to sign up
    useEffect(() => {
        navigation.addListener('blur', () =>{
            clearErrorMessage();
        });
    
    },[]);

    return(
        <View style={styles.containerStyle}>
            
            <AuthForm
                headerText="Sign in for Tracker App"
                errorMessage={state.errorMessage}
                submitButtonText="Sign in"
                onSubmit={signin}
            />
            <NavLink 
                linkText="Do not have an account? Sign up here!"
                screenRouteName="Signup"
            />
        </View>
    );
};


/**
 * 
 */
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    }
});

export default SigninScreen;








/**
 * 
 *THIS GOES INSIDE THE VIEW COMPONENT FOR NAVIGATION 4.X
  <NavigationEvents
                onWillFocus={() => {
                    //any time we are about to navigate to this current screen
                }}
                onDidFocus={() => {
                    //called any time we have succesfully complete navigation over to this screen
                }}
                onWillBlur={() => {
                    //called as soon as this current screen is about to be pressed (not yet navigated, like pre-navigated)
                    console.log('we are about to navigate to signin screen');
                    clearErrorMessage();//clear error message
                }}
                onDidBlur={() => {
                    //as soon as onWillBlur completes
                }}
            />
 */