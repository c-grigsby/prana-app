// @packages
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
// @scripts
import LocationsNavigator from './navigation/LocationsNavigator';
import locationsReducer from './store/reducers/locations-reducer';

const rootReducer = combineReducers({
  locations: locationsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <LocationsNavigator />
    </Provider>
  );
}
