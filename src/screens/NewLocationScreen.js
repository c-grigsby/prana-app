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
//@ scripts
import Colors from '../constants/Colors';
import ImageSelector from '../components/ImageSelector';
import * as locationsActions from '../store/actions/locations-actions';

const NewLocationScreen = (props) => {
  const [error, setError] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setError(false);
      Alert.alert('Please enter a title');
    }
  }, [error]);

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const saveLocationHandler = () => {
    if (titleValue.length < 1) {
      setError(true);
    } else {
      dispatch(locationsActions.addLocation(titleValue, selectedImage));
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
        <ImageSelector onImageTaken={imageTakenHandler} />
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
    fontSize: 17,
  },
});

export default NewLocationScreen;
