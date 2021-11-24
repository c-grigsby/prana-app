// @scripts
import { ADD_LOCATION, SET_LOCATIONS } from '../actions/locations-actions';
import Location from '../../models/location';

const initialState = {
  locations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      const newLocation = new Location(
        action.locationData.id.toString(),
        action.locationData.title,
        action.locationData.image,
        action.locationData.address,
        action.locationData.coords.lat,
        action.locationData.coords.lng
      );
      return {
        locations: state.locations.concat(newLocation),
      };

    case SET_LOCATIONS:
      const previousLocations = action.locations.map((pl) => {
        return new Location(
          pl.id.toString(),
          pl.title,
          pl.imageUri,
          pl.address,
          pl.lat,
          pl.lng
        );
      });
      return {
        locations: previousLocations,
      };

    default:
      return state;
  }
};
