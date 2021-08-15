// @packages
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
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
    <ScrollView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <Button
          title="Save Location"
          color={Colors.secondary}
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
    color: Colors.text,
    fontSize: 19,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: Colors.text,
    fontSize: 17,
    marginBottom: 15,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});

export default NewLocationScreen;
