import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LoginIcon from '../../assets/login-icon.png';
// import Modal from 'react-native-modal';
import Modal from './Modal';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}> {title.toUpperCase()}</Text>
      <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
        <Image source={LoginIcon} style={styles.loginIcon} />
      </TouchableOpacity>
      <Modal setModalStatus={toggleModal} showModal={isModalVisible} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#171717',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4d4d4',
    alignSelf: 'center',
  },
  loginIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
});
