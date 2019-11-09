import React, { Component } from 'react';
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
class AuthenticationView extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('MyAccount', navigation);

  componentDidMount() {
    this.props.authChecker()
  }

  render() {
    return (
      <View style={styles.registerContainer}>
        <StatusBar barStyle="dark-content" />
        <RegisterModalsContainer
          modalVisible={this.props.modalVisible}
          setAgreeModalVisible={this.props.setAgreeModalVisible}
          videoAgree={this.props.videoAgree}
          videoVisible={this.props.videoVisible}
          setModalVisible={this.props.setModalVisible}
          setVideoPlayerModalVisible={this.props.setVideoPlayerModalVisible}
          onLogin={() =>
            authHelpers.handleLogin(
              authHelpers._loginWithAuth0,
              this.props.setUserCreds
            )
          }
        />
        {!this.props.modalVisible && (
          <LoginWithAuth0
            idToken={this.props.idToken}
            navigation={this.props.navigation}
            setModalVisible={this.props.setModalVisible}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    marginHorizontal: 5
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  const { modalVisible, videoAgree, videoVisible, idToken } = state.auth;
  return { modalVisible, videoAgree, videoVisible, idToken };
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
