// @packages
import MapView from 'react-native-maps';
import React from 'react';
import { StyleSheet } from 'react-native';

const MapScreen = (props) => {
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return <MapView region={mapRegion} />;
};

const styles = StyleSheet.create({});

export default MapScreen;
