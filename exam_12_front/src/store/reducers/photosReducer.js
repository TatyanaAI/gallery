import {
    GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE,
    GET_USER_PHOTOS_REQUEST, GET_USER_PHOTOS_SUCCESS, GET_USER_PHOTOS_FAILURE, INIT_PHOTOS
} from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    photos: []
};

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
        case GET_USER_PHOTOS_REQUEST:
            return { ...state, loading: true };
        case GET_PHOTOS_SUCCESS:
        case GET_USER_PHOTOS_SUCCESS:
            return { ...state, loading: false, error: null, photos: action.photos };
        case GET_PHOTOS_FAILURE:
        case GET_USER_PHOTOS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case INIT_PHOTOS:
            return { ...initialState };
        default:
            return state;
    }
};

export default photosReducer;