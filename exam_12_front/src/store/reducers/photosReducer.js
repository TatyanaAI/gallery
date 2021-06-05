import {
    GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE
} from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    photos: [],
};

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return { ...state, loading: true };
        case GET_PHOTOS_SUCCESS:
            return { ...state, loading: false, error: null, photos: action.photos };
        case GET_PHOTOS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default photosReducer;