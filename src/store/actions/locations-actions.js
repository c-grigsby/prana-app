// @packages
import * as FileSystem from 'expo-file-system';

export const ADD_LOCATION = 'ADD_LOCATION';

export const addLocation = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({
      type: ADD_LOCATION,
      locationData: { title: title, image: newPath },
    });
  };
};
