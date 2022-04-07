import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import Spacer from '../components/Spacer';
import MapView, { Polyline } from 'react-native-maps';


const TrackDetailScreen = ({ route: { params } }) => {
    const { state } = useContext(TrackContext); //get list of all tracks
    const { _id } = params;
    const track = state.find(tr=>{ //found_user is always undefined
        return tr._id == _id;
    }); //checks for a track that is the same as _id to track._id and then send the item and set it to variable track

    const initialCoords = track.locations[0].coords;

    return(
        <SafeAreaView forceInset={{top: 'always'}} >
        <>
            <Spacer>
                <Spacer>
                    <Text h3 style={{textAlign: 'center'}} >{track.name}</Text>
                </Spacer>
                <Spacer />
                <Spacer />
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        longitudeDelta: 0.01,
                        latitudeDelta: 0.01,
                        ...initialCoords
                    }}
                >
                    <Polyline 
                        strokeColor="#039BE5"
                        fillColor="rgb(3, 155, 229)"
                        strokeWidth={6}
                        coordinates={track.locations.map(loc => loc.coords)} 
                    />
                </MapView>
            </Spacer>
        </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        height: 300
    }
});

export default TrackDetailScreen;