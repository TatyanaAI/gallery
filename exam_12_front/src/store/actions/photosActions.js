import {
  GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE,
  GET_USER_PHOTOS_REQUEST, GET_USER_PHOTOS_SUCCESS, GET_USER_PHOTOS_FAILURE, INIT_PHOTOS,
  DELETE_PHOTO_REQUEST, DELETE_PHOTO_SUCCESS, DELETE_PHOTO_FAILURE,
  ADD_PHOTO_REQUEST, ADD_PHOTO_FAILURE
} from "../actionTypes";
import axios from 'axios';
import { push } from 'connected-react-router';

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

const getUserPhotosSuccess = (photos, user) => {
  return { type: GET_USER_PHOTOS_SUCCESS, photos, user };
};

const getUserPhotosFailure = error => {
  return { type: GET_USER_PHOTOS_FAILURE, error };
};

export const initPhotos = () => {
  return { type: INIT_PHOTOS };
};

const deletePhotoRequest = () => {
  return { type: DELETE_PHOTO_REQUEST };
};

const deletePhotoSuccess = id => {
  return { type: DELETE_PHOTO_SUCCESS, id };
};

const deletePhotoFailure = error => {
  return { type: DELETE_PHOTO_FAILURE, error };
};

const addPhotoRequest = () => {
  return { type: ADD_PHOTO_REQUEST };
};

const addPhotoFailure = error => {
  return { type: ADD_PHOTO_FAILURE, error };
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
        dispatch(getPhotosFailure(error.response.data.error || error.response.data.message));
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
      const photos = response.data.photos.map(photo => {
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
      dispatch(getUserPhotosSuccess(photos, response.data.user));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(getUserPhotosFailure(error.response.data.error || error.response.data.message));
      } else {
        dispatch(getUserPhotosFailure(error.message));
      }
    }
  };
};

export const deletePhoto = (photoId) => {
  return async dispatch => {
    try {
      dispatch(deletePhotoRequest());
      await axios.delete("/photos/" + photoId);
      dispatch(deletePhotoSuccess(photoId));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(deletePhotoFailure(error.response.data.error || error.response.data.message));
      } else {
        dispatch(deletePhotoFailure(error.message));
      }
    }
  };
};

export const addPhoto = photo => {
  return async dispatch => {
    try {
      dispatch(addPhotoRequest());
      await axios.post("/photos", photo);
      dispatch(push('/'));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(addPhotoFailure(error.response.data.error || error.response.data.message));
      } else {
        dispatch(addPhotoFailure(error.message));
      }
    }
  };
};