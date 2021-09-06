// @packages
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const selectLocation = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    console.log(selectedLocation);
  };

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectLocation}>
      {markerCoordinates && (
        <Marker
          title="Selected Location"
          coordinate={markerCoordinates}
        ></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
