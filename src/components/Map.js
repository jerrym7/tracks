import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps'; //MapView ==== map to show, Polyline ==== a line that accepts an array of longitude and latitude to show a line in the map
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from './Spacer';

const Map = () => {
    const { state: { currentLocation, locations } } = useContext(LocationContext); //destructure only current location only
    if(!currentLocation){ //if no current location return a loading screen
        return <ActivityIndicator size="large" style={{marginTop: 200}} />
    }
    return(
        <>
            <Spacer>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        ...currentLocation.coords, //position of view
                        longitudeDelta: 0.01 , //zoom level to show on the map
                        latitudeDelta: 0.01 //zoom level to show on the map
                    }}
                    
                >
                    <Circle
                        center={currentLocation.coords}
                        radius={35}
                        strokeColor="rgba(158, 158, 255, 1.0)"
                        fillColor="rgba(158, 158, 255, 0.3)"
                    />
                    <Polyline
                        strokeColor="#039BE5"
                        fillColor="rgb(3, 155, 229)"
                        strokeWidth={6}
                        coordinates={locations.map(location => {
                        const { latitude, longitude } = location.coords;
                        return { latitude, longitude }
                        })}
                    />
                </MapView>
            </Spacer>
        </>
    );
};


const styles = StyleSheet.create({
    mapStyle: {
        height: 300
    }
});

export default Map;


/**region={{ //update the map position everytime location updates
                ...currentLocation.coords,
                longitudeDelta: 0.01,
                latitudeDelta: 0.001
            }} ADD THIS BELOW THE initialRegion for mapview to update all the time location updates, but user will not be able to drag the map and zoom out since it will update. */