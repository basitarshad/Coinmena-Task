import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import LoginIcon from '../../assets/login-icon.png';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}> {title.toUpperCase()}</Text>
      <TouchableOpacity>
        <Image source={LoginIcon} style={styles.loginIcon} />
      </TouchableOpacity>
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
