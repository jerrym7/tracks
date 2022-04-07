import React, { useState } from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import Spacer from '../components/Spacer';

const AuthForm = ({ headerText, submitButtonText, errorMessage, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <>
            <Spacer>
                <Text h3 style={{textAlign: 'center'}}>{headerText}</Text>
            </Spacer>
            <Spacer/>
            <Input label="Email" 
                autoCapitalize="none"
                autoCorrect={false}
                value={email} 
                onChangeText={setEmail}
            />
            <Spacer/>
            <Input label="Password"
                secureTextEntry={true} 
                value={password}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPassword}
            />
            {errorMessage?<Text style={styles.errorMessageStyle}>{errorMessage}</Text>:null}
            <Spacer>
                <Button title={submitButtonText}
                    disabled={false}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => {
                        onSubmit({email, password});
                    }}
                />
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
    },
    errorMessageStyle:{
        color: 'red',
        fontSize: 14,
        marginLeft: 12
    }
});

export default AuthForm;