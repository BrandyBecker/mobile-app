import React, { Component, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LoginWithAuth0 from '../components/Authentication/LoginWithAuth0';
import { connect } from 'react-redux';
import RegisterModalsContainer from '../components/AuthModals/RegisterModalsContainer';
import {
  setModalVisible,
  setAgreeModalVisible,
  setVideoPlayerModalVisible,
  setUserCreds,
  authChecker
} from '../store/actions';
import authHelpers from '../helpers/authHelpers';
import headerConfig from '../helpers/headerConfig';


const AuthenticationView = (props) => {

  useEffect(() => {
    // if (props.loadingUser) {
      props.authChecker()
    // }
    console.log('firing')
  }, [props.loadingUser])

  return (
    // !props.loadingUser &&
    <View style={styles.registerContainer}>
      <StatusBar barStyle="dark-content" />
      <RegisterModalsContainer
        modalVisible={props.modalVisible}
        setAgreeModalVisible={props.setAgreeModalVisible}
        videoAgree={props.videoAgree}
        videoVisible={props.videoVisible}
        setModalVisible={props.setModalVisible}
        setVideoPlayerModalVisible={props.setVideoPlayerModalVisible}
        onLogin={() =>
          authHelpers.handleLogin(
            authHelpers._loginWithAuth0,
            props.setUserCreds
          )
        }
      />
      {!props.modalVisible && (
        <LoginWithAuth0
          idToken={props.idToken}
          navigation={props.navigation}
          setModalVisible={props.setModalVisible}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    marginHorizontal: 5
  }
});

const mapStateToProps = state => {
  const { 
    modalVisible, 
    videoAgree, 
    videoVisible,  
  } = state.auth;
  const {idToken, loadingUser} = state.auth
  
  return { 
    modalVisible, 
    videoAgree, 
    videoVisible, 
    idToken,
    loadingUser
  };
};

export default connect(
  mapStateToProps,
  {
    setModalVisible,
    setAgreeModalVisible,
    setVideoPlayerModalVisible,
    setUserCreds,
    authChecker
  }
)(AuthenticationView);