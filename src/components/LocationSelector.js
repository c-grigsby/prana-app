// @packages
import React from 'react';
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

const LocationSelector = (props) => {
  const getLocationHandler = () => {};

  return (
    <View style={styles.locationSelector}>
      <View style={styles.mapPreview}>
        <Text style={styles.text}>No location chosen yet!</Text>
      </View>
      <Button
        color={Colors.primary}
        onPress={getLocationHandler}
        title="Get User Location"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationSelector: {
    marginBottom: 15,
  },
  mapPreview: {
    borderColor: '#ccc',
    borderWidth: 0.75,
    height: 150,
    marginBottom: 10,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
});

export default LocationSelector;
