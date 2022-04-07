import React, {useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

/**
 * This will be a helper to wait for checking local storage before showing any screen to the user
 * @returns show nothing
 */
const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        //this is to call it only once to check for local token in storage since this is the initial route for this navigator
        tryLocalSignin();
    }, []);

    return null;
};

export default ResolveAuthScreen;