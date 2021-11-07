// @packages
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
// @scripts
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const LocationDetailScreen = (props) => {
  const locationId = props.navigation.getParam('locationId');
  const selectedLocation = useSelector((state) =>
    state.locations.locations.find((location) => location.id === locationId)
  );

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image source={{ uri: selectedLocation.imageUri }} style={styles.image} />
      <LinearGradient
        colors={['#28313b', '#485461']}
        style={styles.locationContainer}
      >
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedLocation.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      </LinearGradient>
    </ScrollView>
  );
};

LocationDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('locationTitle'),
  };
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    backgroundColor: '#191919',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.primary,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 280,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.primary,
  },
});

export default LocationDetailScreen;
