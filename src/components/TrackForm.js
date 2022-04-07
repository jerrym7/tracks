import React, { useContext } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {

    const { state: { name, recording, locations }, 
        startRecording, 
        stopRecording, 
        changeName } = useContext(LocationContext);

        const [saveTracks] = useSaveTrack();

    const onButtonPress = () => {
        if(recording){ //if recoring, then we want to stop recording since recording flag is true
            return stopRecording();
        }
        else{ //we want to start recording since recording flag is false
            return startRecording();
        }
    };

    return(
        <>
            <Spacer />
            <Spacer>
                <Input placeholder='Enter track name' onChangeText={changeName} value={name} />
            </Spacer>
            <Spacer>
                <Button buttonStyle={styles.buttonStyle} title={recording? "Stop recording": "Start recording" } onPress={onButtonPress}/>
            </Spacer>
            <Spacer>
                {!recording && locations.length && name.length?<Button buttonStyle={styles.buttonStyle} title="Save recording" onPress={saveTracks} />:
                 <Text>To save your tracker please add tracker name or start recording then stop recording when done. </Text> }
            </Spacer>
        </>
    );
};


const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 30,
    }
});

export default TrackForm;