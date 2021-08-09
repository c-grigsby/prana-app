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
import * as locationsActions from '../store/actions/locations-actions';

const NewLocationScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setError(false);
      Alert.alert('Please enter a title');
    }
  }, [error]);

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
    fontFamily: 'Cochin',
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
