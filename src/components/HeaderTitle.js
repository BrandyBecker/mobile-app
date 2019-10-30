import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import logoImg from '../../assets/simple-logo.png';
import { Ionicons } from '@expo/vector-icons'
import constants from '../helpers/constants';
import { sendEvent } from '../helpers/createEvent';
import { connect } from 'react-redux';

const HeaderTitle = ({ title, navigation, email }) => (
  // title should be the string of the components name
  <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
    {/* on android the text renders left aligned and therefore we put the logo next to it, ios renders centered */}
    {Platform.OS === 'android' ? (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('BestPractices');
          sendEvent(email, 'click', 'logo');
        }}
      >
        <Image
          source={logoImg}
          style={{ width: 40, height: 40, marginHorizontal: 10 }}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
    ) : null}
        <Text style={styles.text}>{title}</Text> 
        
  </View>
);

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 25,
    fontFamily: constants.headerFont
  }
});

const mapStateToProps = state => {
  return { email: state.auth.user ? state.auth.user.email : null };
};

export default connect(
  mapStateToProps,
  {}
)(HeaderTitle);
