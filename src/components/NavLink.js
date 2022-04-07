import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ linkText, screenRouteName, }) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.navigate(screenRouteName)} >
            <Spacer>
                <Text style={styles.linkStyle} >{linkText}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    linkStyle: {
        color: 'blue'
    }
});

export default NavLink;