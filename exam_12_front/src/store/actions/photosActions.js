import {
  GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE,
  GET_USER_PHOTOS_REQUEST, GET_USER_PHOTOS_SUCCESS, GET_USER_PHOTOS_FAILURE, INIT_PHOTOS
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

const getUserPhotosRequest = () => {
  return { type: GET_USER_PHOTOS_REQUEST };
};

const getUserPhotosSuccess = (photos) => {
  return { type: GET_USER_PHOTOS_SUCCESS, photos };
};

const getUserPhotosFailure = error => {
  return { type: GET_USER_PHOTOS_FAILURE, error };
};

export const initPhotos = () => {
  return { type: INIT_PHOTOS };
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

export const userPhotosRequest = userId => {
  return async dispatch => {
    try {
      dispatch(getUserPhotosRequest())
      const response = await axios.get("/photos/" + userId);
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
      dispatch(getUserPhotosSuccess(photos));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(getUserPhotosFailure(error.response.data.error));
      } else {
        dispatch(getUserPhotosFailure(error.message));
      }
    }
  };
};