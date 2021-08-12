// @packages
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
//@ scripts
import Colors from '../constants/Colors';
import * as locationsActions from '../store/actions/locations-actions';

const NewLocationScreen = (props) => {
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [titleValue, setTitleValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setError(false);
      Alert.alert('Please enter a title');
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveLocationHandler = () => {
    if (titleValue.length < 1) {
      setError(true);
    } else {
      dispatch(locationsActions.addLocation(titleValue));
      props.navigation.goBack();
    }
  };

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} />
        <Button
          color={Colors.primary}
          title="Select image from camera roll"
          onPress={pickImage}
        />
        {image && <Image source={{ uri: image }} style={styles.img} />}
        <Button
          title="Save Location"
          color={Colors.primary}
          onPress={saveLocationHandler}
          value={titleValue}
        />
      </View>
    </ScrollView>
  );
};

NewLocationScreen.navigationOptions = {
  headerTitle: 'Add Location',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  img: {
    margin: 15,
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  label: {
    fontSize: 19,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewLocationScreen;
