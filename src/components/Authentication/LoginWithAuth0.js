import React, { Component } from 'react';
import authHelpers from '../../helpers/authHelpers';
import { connect } from 'react-redux';
import { setUserCreds, logOut, clearUserCases } from '../../store/actions';
import Login from './Login';

class LoginWithAuth0 extends Component {
  onRegister = () => {};

  render() {
    // console.log('login props: ', this.props);
    return (
      <Login
        navigation={this.props.navigation}
        onLogin={() =>
          authHelpers.handleLogin(
            authHelpers._loginWithAuth0,
            this.props.setUserCreds
          )
        }
        onRegister={() =>
          authHelpers.handleLogin(
            authHelpers._loginWithAuth0,
            this.props.setUserCreds
          )
        }
        email={this.props.user ? this.props.user.email : null}
        isLoggedIn={this.props.isLoggedIn}
        logOut={this.props.logOut}
        clearUserCases={this.props.clearUserCases}
        setModalVisible={this.props.setModalVisible}
      />
    );
  }
}

const mapStateToProps = state => {
  const { user, isLoggedIn, authToken, idToken } = state.auth;
  return { user, isLoggedIn, authToken, idToken };
};

export default connect(
  mapStateToProps,
  { setUserCreds, logOut, clearUserCases }
)(LoginWithAuth0);
