// @packages
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LocationDetailScreen = (props) => {
  return (
    <View>
      <Text>LocationsDetailScreen</Text>
    </View>
  );
};

LocationDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('locationTitle'),
  };
};

const styles = StyleSheet.create({});

export default LocationDetailScreen;
