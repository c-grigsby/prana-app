// @packages
import MapView, { Marker } from 'react-native-maps';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation ? initialLocation.selectedLocation : ''
  );

  const mapRegion = {
    latitude: selectedLocation ? selectedLocation.latitude : 35.8486,
    longitude: selectedLocation ? selectedLocation.longitude : -86.3649,
    latitudeDelta: selectedLocation ? 0.0922 : 32.0,
    longitudeDelta: selectedLocation ? 0.0421 : 32.0,
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const saveSelectedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location selected');
      return;
    }
    props.navigation.navigate('NewLocation', {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveSelectedLocation });
  }, [saveSelectedLocation]);

  const selectLocation = (event) => {
    if (readonly) return;

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
          title="Selected"
          coordinate={markerCoordinates}
          draggable
        ></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');
  if (readonly) return {};

  return {
    headerRight: (
         <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
           <Text style={styles.headerButtonText}>Save</Text>
           <Ionicons name="save-outline" size={18} color={Colors.backgroundColor} style={styles.icon}/>
         </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 18,
    marginRight: 3,
    color: Colors.backgroundColor,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
