import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001; //ten meters in longitude and latitude (~10 meters).

const getLocation = increment => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 'YOUR_LATITUDE' + increment * tenMetersWithDegrees,
            latitude: 'YOUR_LATITUDE' + increment * tenMetersWithDegrees
        }
    }
};

let counter = 0;

setInterval(() => { //Thread that starts every 1 second over time to update the location (DO NOT IMPORT THIS TO A REAL WORLD PROJECT - TESTING PURPOSES)
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000)
