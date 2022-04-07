import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import { useNavigation } from '@react-navigation/native';

/**
 * Hook to communicate between two context
 * we will pulling information out of location context (list of points) and the action function out of trackcontext(creaTracks)
 * and throw the list of points into the trackcontext function (creaTracks()); 
 */
export default () => {
    const { createTrack } = useContext(TrackContext);//import the createTracks function
    const { state: { name, locations }, reset } = useContext(LocationContext);//import the name and locations from the state of LocationContext
    const navigation = useNavigation();

    //create a function for future use
    const saveTrack = async () => { //async to await for success of the creaTrack function
        await createTrack(name, locations);//run the function with params given by the state of LocationContext
        reset();//reset all the states for locations (CreateTrack)
        navigation.navigate('TrackList'); //navigate to tracklist screen
    };

    return [saveTrack]; //to be used in the future in a different place. 
};