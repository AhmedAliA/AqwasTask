import {
    HOME_PROP_CHANGED,
    GET_NEW_SUGGESTION_FAILED,
    GET_NEW_SUGGESTION_START,
    GET_NEW_SUGGESTION_SUCCESS
} from './types'
import api from '../api';
import store from '../../store';

export const homePropChanged = (prop, value) => {
    return (dispatch) => {
        dispatch({
            type: HOME_PROP_CHANGED,
            prop,
            value
        })
    }
}

export function suggestPlace() {
    const location = store.getState().home.currentLocation;
    console.log('location')
    return async (dispatch) => {
        dispatch({
            type: GET_NEW_SUGGESTION_START,
        })
        let response = await api.getNewSuggestion(location),
            responseJson
        if (response) {
            /* Handling response */
            switch (response.status) {
                case 200:
                    /* Handling Success */
                    responseJson = await response.json()
                    console.log(responseJson)
                    dispatch({
                        type: GET_NEW_SUGGESTION_SUCCESS,
                        data: responseJson
                    })
                    break;
                default:
                    dispatch({
                        type: GET_NEW_SUGGESTION_FAILED
                    })
                    break;
            }
        } else {
            // CONNECTION ERROR 
        }
    }
}
