// @packages
import * as FileSystem from 'expo-file-system';
// @scripts
export const ADD_LOCATION = 'ADD_LOCATION';
export const SET_LOCATIONS = 'SET_LOCATIONS';
import { fetchLocations, insertLocation } from '../../helpers/db';
import ENV from '../../env';

export const addLocation = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`
    );
    if (!response.ok)
      throw new Error('Something went wrong getting the address from the API!');

    const resData = await response.json();
    if (!resData.results) {
      throw new Error('The address result is missing from the API!');
    }
    console.log(resData);
    const address = resData.results[0].formatted_address;
    console.log('Address:', resData.results[0].formatted_address);

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
        address,
        location.latitude,
        location.longitude
      );
      console.log(dbResult);
      dispatch({
        type: ADD_LOCATION,
        locationData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.latitude,
            lng: location.longitude,
          },
        },
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
