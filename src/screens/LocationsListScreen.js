// @packages
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
// @scripts
import HeaderButton from '../components/HeaderButton';

const LocationsListScreen = (props) => {
  return (
    <View>
      <Text>LocationsListScreen</Text>
    </View>
  );
};

LocationsListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Locations',
    headerLeft: (
      <Image
        style={{ width: 30, height: 30, resizeMode: 'contain', marginLeft: 10 }}
        source={require('../assets/leaf.png')}
      />
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Location"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewLocation');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default LocationsListScreen;
