import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../RootStackParams';
import Header from '../../components/Header'

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();

  return (
    <View style={{flex: 1}}>
      <Header title={'Home'}/>
    </View>
  );
}

export default HomeScreen;