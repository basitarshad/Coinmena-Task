import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Menu, Pressable, NativeBaseProvider} from 'native-base';
import CryptoToUSD from '../../components/CryptoToUSD';
import USDToCrypto from '../../components/USDToCrypto';
import {
  setToStorage,
  removeFromStorage,
  getFromStorage,
} from '../../common/storage';
import {RootStackParamList} from '../RootStackParams';
import Header from '../../components/Header';
import ArrowDown from '../../../assets/arrow-down.png';

type authScreenProp = StackNavigationProp<RootStackParamList, 'Trade'>;

function TradeScreen() {
  const navigation = useNavigation<authScreenProp>();

  const [cryptos, setCryptos] = useState(1);
  const [cryptoRates, setCryptoRates] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [toUSDs, settoUSDs] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [activityIndicator, showActivityIndicator] = useState(false);
  const [userStatusChanged, setUserStatusChanged] = useState(false);

  useEffect(() => {
    getCryptoRates();
    getFromStorage('user_details').then(data => {
      if (data) {
        setUserInfo(data);
      } else {
        setUserInfo(data);
      }
    });
  }, [userStatusChanged]);

  const getCryptoRates = () => {
    showActivityIndicator(true);
    Axios.get(`https://api.exchangerate.host/latest`).then(res => {
      if (res) {
        setCryptoRates(res.data.rates);
      }
      showActivityIndicator(false);
    });
  };

  const cryptoToUSD = () => {
    let USD = 185;
    let result = selectedCrypto
      ? (cryptoRates[selectedCrypto] * cryptos) / USD
      : 0;
    return result;
  };

  const usdToCrypto = () => {
    let USD = 185;
    let result = selectedCrypto
      ? (cryptoRates[selectedCrypto] * USD) / cryptos
      : 0;
    return result;
  };

  const userUpdated = () => {
    setUserStatusChanged(!userStatusChanged);
  };

  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <Header title={'Trade'} userUpdated={userUpdated} />
        {activityIndicator ? (
          <ActivityIndicator style={{flex: 1}} color={'darkgreen'} />
        ) : userInfo ? (
          <>
            {toUSDs ? (
              <CryptoToUSD
                cryptos={cryptos}
                setCryptos={setCryptos}
                cryptoRates={cryptoRates}
                setSelectedCrypto={setSelectedCrypto}
                selectedCrypto={selectedCrypto}
                cryptoToUSD={cryptoToUSD}
              />
            ) : (
              <USDToCrypto
                cryptos={cryptos}
                setCryptos={setCryptos}
                cryptoRates={cryptoRates}
                setSelectedCrypto={setSelectedCrypto}
                selectedCrypto={selectedCrypto}
                usdToCrypto={usdToCrypto}
              />
            )}

            <TouchableOpacity
              style={styles.swipeContainer}
              onPress={() => settoUSDs(!toUSDs)}>
              <Text style={styles.swipeText}>Swipe</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text
            style={{
              color: '#d4d4d4',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 100,
            }}>
            Please login to continue!
          </Text>
        )}
      </View>
    </NativeBaseProvider>
  );
}

export default TradeScreen;

const styles = StyleSheet.create({
  swipeContainer: {
    width: '90%',
    height: 60,
    backgroundColor: '#171717',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeText: {color: '#d4d4d4', fontSize: 18, fontWeight: 'bold'},
});
