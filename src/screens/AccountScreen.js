import React, {useContext} from 'react';
import { Text, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signout } =useContext(AuthContext);
    return(
        <SafeAreaView forceInset={{top: 'always'}} >
            <>
                <Spacer>
                    <Spacer>
                        <Text h3 style={{textAlign: 'center'}}>Account</Text>
                    </Spacer>
                    <Spacer/>
                    <Button title="Sign out"
                        buttonStyle={styles.buttonStyle}
                        onPress={() => {
                            signout();//sign out
                        }}
                    />
                </Spacer>
            </>
        </SafeAreaView>
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

export default AccountScreen;