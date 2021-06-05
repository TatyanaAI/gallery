import {
    GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE,
    GET_USER_PHOTOS_REQUEST, GET_USER_PHOTOS_SUCCESS, GET_USER_PHOTOS_FAILURE, INIT_PHOTOS,
    DELETE_PHOTO_REQUEST, DELETE_PHOTO_SUCCESS, DELETE_PHOTO_FAILURE
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
        case DELETE_PHOTO_REQUEST:
            return { ...state, loading: true };
        case GET_PHOTOS_SUCCESS:
        case GET_USER_PHOTOS_SUCCESS:
            return { ...state, loading: false, error: null, photos: action.photos };
        case GET_PHOTOS_FAILURE:
        case GET_USER_PHOTOS_FAILURE:
        case DELETE_PHOTO_FAILURE:
            return { ...state, loading: false, error: action.error };
        case INIT_PHOTOS:
            return { ...initialState };
        case DELETE_PHOTO_SUCCESS: {
            let newPhotos = [...state.photos].filter(photo => photo.id !== action.id);
            return { ...state, loading: false, error: null, photos: newPhotos };
        }
        default:
            return state;
    }
};

export default photosReducer;