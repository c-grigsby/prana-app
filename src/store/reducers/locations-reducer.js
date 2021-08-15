// @scripts
import { ADD_LOCATION } from '../actions/locations-actions';
import Location from '../../models/location';

const initialState = {
  locations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      const newLocation = new Location(
        new Date().toString(),
        action.locationData.title,
        action.locationData.image
      );
      return {
        locations: state.locations.concat(newLocation),
      };
    default:
      return state;
  }
};
