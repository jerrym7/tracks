import '../_mockLocation'; //start mocking the location for test purposes. 
import React, { useCallback, useContext } from 'react';
import {  StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { Text } from 'react-native-elements'
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext'
import Spacer from '../components/Spacer';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = () => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => { 
        //useCallback is there to avoid rerending multiple time as useEffect does when watching for multiple objects 
        //and not create mutiple functions creates a app crash
        return addLocation(location, recording)
    }, [recording]);
    const [err] = useLocation(useIsFocused() || recording, callback); //or you can rewrite this hook as ===> useLocation(addLocation)


    return(
        <SafeAreaView forceInset={{top: 'always'}} >
            <>
                <Spacer>
                    <Spacer>
                        <Text h3 style={{textAlign: 'center'}}>Create a track</Text>
                    </Spacer>
                </Spacer>
                <Map 
                />
                {err? <Text style={styles.errMessageStyle}>Please enable location services</Text>: null}
                <TrackForm />
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    errMessageStyle:{
        color: 'red'
    }
});

export default TrackCreateScreen;