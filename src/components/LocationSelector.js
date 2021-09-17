// @packages
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// @scripts
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';

const LocationSelector = (props) => {
  const [chosenLocation, setChosenLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapChosenLocation = props.navigation.getParam('pickedLocation');

  useEffect(() => {
    if (mapChosenLocation) {
      setChosenLocation(mapChosenLocation);
    }
  }, [mapChosenLocation]);

  const verifyPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions',
        'Sorry, you need to grant location permissions to use this app',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const permission = await verifyPermissions();
    if (!permission) return;
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setChosenLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationSelector}>
      <MapPreview
        style={styles.mapPreview}
        location={chosenLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text style={styles.text}>No location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          onPress={getLocationHandler}
          title="Get Location"
        />
        <Button
          color={Colors.primary}
          onPress={pickOnMapHandler}
          title="Select on Map"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  locationSelector: {
    marginBottom: 10,
  },
  mapPreview: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0.75,
    height: 160,
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  text: {
    color: '#fff',
    justifyContent: 'center',
  },
});

export default LocationSelector;
