import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch(action.type){
        case 'fetch_tracks':
            return action.payload;//payload has the response.data
        default:
            return state;
    }
};

const fetchTracks = (dispatch) => async () => {
    const response = await trackerApi.get('/tracks');
    dispatch({ type: 'fetch_tracks', payload: response.data })
};

const createTrack = dispatch => async (name, locations) => {
    await trackerApi.post('/tracks', { name, locations })
};

/**
 * This context is to store all tracks already posted to the server and saving the tracks to the database
 */

export const {Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack }, //functions to make request to api
    []//this is the list of tracks
);
