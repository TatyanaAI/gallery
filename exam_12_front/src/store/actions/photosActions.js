import {
  GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE
} from "../actionTypes";
import axios from 'axios';

const getPhotosRequest = () => {
  return { type: GET_PHOTOS_REQUEST };
};

const getPhotosSuccess = (photos) => {
  return { type: GET_PHOTOS_SUCCESS, photos };
};

const getPhotosFailure = error => {
  return { type: GET_PHOTOS_FAILURE, error };
};

export const photosRequest = () => {
  return async dispatch => {
    try {
      dispatch(getPhotosRequest())
      const response = await axios.get("/photos");
      const photos = response.data.map(photo => {
        return {
          key: photo._id,
          id: photo._id,
          title: photo.title,
          image: "http://localhost:8000/uploads/" + photo.image,
          user: {
            id: photo.user._id,
            username: photo.user.username
          }
        }
      });
      dispatch(getPhotosSuccess(photos));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(getPhotosFailure(error.response.data.error));
      } else {
        dispatch(getPhotosFailure(error.message));
      }
    }
  };
};