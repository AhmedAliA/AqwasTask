import {
    HOME_PROP_CHANGED,
    GET_NEW_SUGGESTION_FAILED,
    GET_NEW_SUGGESTION_START,
    GET_NEW_SUGGESTION_SUCCESS
} from '../actions/types'

const INIT_STATE = {
    currentLocation: null,
    homeLoading: false,
    restaurantInfo: null
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case HOME_PROP_CHANGED:
            return {
                ...state,
                [action.prop]: action.value
            }
        case GET_NEW_SUGGESTION_START:
            return {
                ...state, homeLoading: true
            }
        case GET_NEW_SUGGESTION_FAILED:
            return {
                ...state, homeLoading: false, restaurantInfo: null
            }
        case GET_NEW_SUGGESTION_SUCCESS:
            return {
                ...state, homeLoading: false, restaurantInfo: action.data
            }
        default:
            return state;
    }
};