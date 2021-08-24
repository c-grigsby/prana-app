// @packages
import React, { useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// @scripts
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import LocationItem from '../components/LocationItem';
import * as locationsActions from '../store/actions/locations-actions';

const LocationsListScreen = (props) => {
  const locations = useSelector((state) => state.locations.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(locationsActions.loadLocations());
  }, [dispatch]);

  console.log('Locations Data: LIST_SCREEN', locations);

  const onSelectHandler = (itemData) => {
    props.navigation.navigate('LocationDetail', {
      locationTitle: itemData.item.title,
      locationId: itemData.item.id,
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <Text style={styles.prana}>Prana</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <LocationItem
            address={null}
            image={itemData.item.imageUri}
            onSelect={() => onSelectHandler(itemData)}
            title={itemData.item.title}
          />
        )}
      />
    </View>
  );
};

LocationsListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Locations',
    headerLeft: (
      <Image
        source={require('../assets/leaf.png')}
        style={{ width: 26, height: 26, resizeMode: 'contain', marginLeft: 12 }}
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

const styles = StyleSheet.create({
  prana: {
    fontSize: 38,
    fontFamily: 'Cochin',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 10,
    color: Colors.secondary,
  },
});

export default LocationsListScreen;
