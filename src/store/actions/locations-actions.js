// @packages
import * as FileSystem from 'expo-file-system';
// @scripts
export const ADD_LOCATION = 'ADD_LOCATION';
export const SET_LOCATIONS = 'SET_LOCATIONS';
import { fetchLocations, insertLocation } from '../../helpers/db';

export const addLocation = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertLocation(
        title,
        newPath,
        'Fake address',
        16.6,
        14.3
      );
      console.log(dbResult);
      dispatch({
        type: ADD_LOCATION,
        locationData: { id: dbResult.insertId, title: title, image: newPath },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadLocations = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchLocations();
      console.log(dbResult);
      dispatch({ type: SET_LOCATIONS, locations: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
