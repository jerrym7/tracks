import React, { useContext, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
    const { state , fetchTracks } = useContext(TrackContext);
    //useEffect() will be called whenn about to go to sign up
    useEffect(() => {
        navigation.addListener('focus', async () =>{
            await fetchTracks();
        });
    
    },[]);

    return(
            <>
                <FlatList
                    data={state}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('TrackDetail', {_id: item._id});//pass the id of the item to the next screen
                            }}
                            >
                                   <ListItem 
                                    bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title>{item.name}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                            </TouchableOpacity>
                        );
                    }}
                />
            </>
    );
};

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 30,
    },
    containerStyle: {
        flex: 1,
        marginTop: 30
    }
});

export default TrackListScreen;