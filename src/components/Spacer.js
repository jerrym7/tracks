import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * 
 * @param {*} param0 ==== this will be children components we want to add padding around it
 * @returns ===returns a view with space around it for help due to react-native-elements do not have padding around it
 */
const Spacer = ({ children }) => {
    return(
        <View style={styles.spacer}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    spacer:{
        margin: 12
    }
});

export default Spacer;