import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' //npm install @react-navigation/bottom-tabs
import { FontAwesome } from '@expo/vector-icons';

import { Context as AuthContext } from './src/context/AuthContext';
import { Provider as AuthProvider } from './src/context/AuthContext'; //get provider from authentication context
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';


//React-native version 4.x 
/**const AuthenticateStackNavigator = createNativeStackNavigator({ //this is to add another stack inside the switch flow for singin to go to signup
    Signup: SignupScreen,
    Signin: SigninScreen
  });

const MainNavigator = createBottomTabNavigator({ //create a bottom navigator after going to main screen (logged in), to navigate from one screen and the other
    trackListFlow: createNativeStackNavigator({ //flow because the tracklist goes to the track detail
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
    
  });*/

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * 
 * @returns === since we cannot 
 */
const TabWithStackNavigatorWrapper = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrackList" 
        component={TrackListScreen} 
        options={{
          headerShown: true,
          title: 'Tracks'
        }} 
      />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

/**
 * This component will return the screen for users that are not signed in or not registered which means they do not have a JWT
 * @returns ==== Navigator for users that are not authenticated
 */
const NotAuthenticateNavigator = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}  />
        <Stack.Screen name="Signin" component={SigninScreen}  options={{headerShown: false}} />
      </Stack.Navigator>
    );
};

/**
 * This function will return a component only if the user is autheticated and is signed in by having a JWT. 
 * @returns ==== Navigator component for users that are authenticated and have a JWT (are signed in)
 */
const BottomNavigatorAuthenticated = () => {
  return(
      <Tab.Navigator screenOptions={{
         tabBarActiveTintColor: 'black',
      }}>
        <Tab.Screen name="TrackListStack" 
        component={TabWithStackNavigatorWrapper} 
        options={{
          headerShown:false,
          tabBarLabel: 'Tracks',
          tabBarIcon: ({color, size}) => (
              <FontAwesome name="list" color={color} size={size} />
            ),
      }} 
    />
        <Tab.Screen name="TrackCreate" 
          component={TrackCreateScreen} 
          options={{
            headerShown: false,
            tabBarLabel: 'Create Track',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="plus" color={color} size={size} />
            )
          }
        } 
        />
        <Tab.Screen name="Account" 
        component={AccountScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="gear" color={color} size={size} />
          ),

          }} />
      </Tab.Navigator>
    );
};
  

/**
 * This function will be called all the time to make sure user is authenticated for security purposes
 * @returns ==== returns a navigator depending if user has a JWT or not (if user is signed in or not).
 */
const isUserAuthenticated = (token) => {

  if(token){
    return <BottomNavigatorAuthenticated />
  }
  
  return <NotAuthenticateNavigator />
};



/**
 * Function to show App component on user start up
 * @returns ==== returns component to show on 
 */
const App = () => {
  const { state, tryLocalSignin } = useContext(AuthContext);
  tryLocalSignin(); 
  return (
    <NavigationContainer>
      {
        isUserAuthenticated(state.token) //check if user is authenticated to return a navigator depending on signin status
      }
    </NavigationContainer>
  );
};

/**
 * return the authprovider with app
 */
export default () => {
  return(
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
};
