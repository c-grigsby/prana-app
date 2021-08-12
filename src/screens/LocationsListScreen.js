// @packages
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

// @scripts
import HeaderButton from '../components/HeaderButton';
import LocationItem from '../components/LocationItem';

const LocationsListScreen = (props) => {
  const locations = useSelector((state) => state.locations.locations);

  const onSelectHandler = (itemData) => {
    props.navigation.navigate('LocationDetail', {
      locationTitle: itemData.item.title,
      locationId: itemData.item.id,
    });
  };
  return (
    <View>
      <Text style={styles.prana}>Prana</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <LocationItem
            image={null}
            title={itemData.item.title}
            address={null}
            onSelect={() => onSelectHandler(itemData)}
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
        style={{ width: 26, height: 26, resizeMode: 'contain', marginLeft: 10 }}
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

const styles = StyleSheet.create({
  prana: {
    fontSize: 30,
    fontFamily: 'Cochin',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default LocationsListScreen;
