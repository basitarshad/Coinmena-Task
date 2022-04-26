import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';

import {emailValidator, passwordValidator} from '../common/helpers';
import {
  setToStorage,
  removeFromStorage,
  getFromStorage,
} from '../common/storage';

type ModalProps = {
  setModalStatus: Function;
  showModal: boolean;
};

const ModalView: React.FC<ModalProps> = ({setModalStatus, showModal}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getFromStorage('user_details').then(data => {
      if (data) {
        setUserInfo(data);
      } else {
        setUserInfo(data);
      }
    });
  }, [showModal]);

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    setUserInfo({email: email.value, password: password.value});

    setToStorage('user_details', {
      email: email.value,
      password: password.value,
    });

    setEmail({value: '', error: ''});
    setPassword({value: '', error: ''});
    setModalStatus();
  };
  return (
    <Modal
      isVisible={showModal}
      animationIn="slideInUp"
      onBackdropPress={() => setModalStatus()}>
      <View style={styles.container}>
        {userInfo ? (
          <>
            <Text style={styles.userExists}>
              User is already login. Do you want to Logout?
            </Text>

            <TouchableOpacity
              style={styles.logoutContainer}
              onPress={() => {
                removeFromStorage('user_details');
                setModalStatus();
              }}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={text => setEmail({value: text, error: ''})}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder="Enter email"
              style={{
                backgroundColor: '#d4d4d4',
                marginHorizontal: 20,
                borderRadius: 10,
              }}
            />

            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({value: text, error: ''})}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
              placeholder="Enter password"
              style={{
                backgroundColor: '#d4d4d4',
                marginHorizontal: 20,
                marginTop: 20,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#d4d4d4',
                marginHorizontal: 20,
                marginTop: 20,
                borderRadius: 10,
                height: 50,
              }}
              onPress={_onLoginPressed}>
              <Text>Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '50%',
    backgroundColor: '#7c7c7c',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  userExists: {
    color: '#ff4148',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    height: 50,
  },
});
