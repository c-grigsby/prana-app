// @packages
import React, { useEffect, useState } from 'react';
import { Alert} from 'react-native';
import * as Location from 'expo-location';

const GetUserLocation = async () => {

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

        const permission = await verifyPermissions();

        if (!permission) return;
        try {
          //setIsFetching(true);
          const location = await Location.getCurrentPositionAsync({
            timeout: 0,
          });
          //console.log(location);
          // setChosenLocation({
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          // });
          // props.onLocationChosen({
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          // });
          console.log('We got a location!!!', location);
          const location2 = {latitude: location.coords.latitude, longitude: location.coords.longitude}
          console.log('This is what we are sending!!!', location2);

          return {latitude: location.coords.latitude, longitude: location.coords.longitude};

        } catch (err) {
          Alert.alert(
            'Could not fetch location!',
            'Please try again later or pick a location on the map.',
            [{ text: 'Okay' }]
          );
        }
        //setIsFetching(false);
      };

export default GetUserLocation; 