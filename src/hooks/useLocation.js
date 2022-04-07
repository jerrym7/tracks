import { useState, useEffect } from 'react';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';


export default (isFocused,callback) => {
    const [err, setErr] = useState(null);
    
    let subscriber;
    

  //useEffect to show once you go into the screen and will be called when isFocused is changed. 
  useEffect(()=>{
    //adding start watching here tells useEffect that startWatching is a DEPENDENCY
    //sart checking/recording the location of user
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {//check if user did not grant permission
          throw new Error('Location permission not granted'); //throws error if user did not grant the permission
        }
        //get location
        subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,  //how accurate you want location to be, more accurate means more power comsuption
          timeInterval: 1000, //update once every second
          distanceInterval: 10, //update once every 10 meter
          }, callback);
      } catch (e) {
        setErr(e);//if they denied the permission we need to set err message state
      }
  };

    if(isFocused){ //when the screen is focused
      startWatching();
    }
    else{ //when the screen is not focused anymore
      if(subscriber){
        subscriber.remove();
      }
      subscriber = null;
    }
    //this is use to not re-render or call the function over and over. 
    return () => {
      if(subscriber){
        subscriber.remove();
      }
    };
  },[isFocused, callback, subscriber]);//if isFocused changes the above function changes or if the callback function changes meaning the state.locations changes

  return [err];
};
/**
 * we modified the call back due to reusable hook: previous call back was
 * (location) => { //everytime it updates it calls here with current location
            addLocation(location);
        }
    instead of calback() line 17
 */

