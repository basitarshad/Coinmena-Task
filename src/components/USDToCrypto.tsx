import {Menu, Pressable} from 'native-base';
import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import ArrowDown from '../../assets/arrow-down.png';

type USDToCryptoProps = {
  cryptos: number;
  setCryptos: Function;
  cryptoRates: Object;
  setSelectedCrypto: Function;
  selectedCrypto: string;
  usdToCrypto: Function;
};

const USDToCrypto: React.FC<USDToCryptoProps> = ({
  cryptos,
  setCryptos,
  cryptoRates,
  setSelectedCrypto,
  selectedCrypto,
  usdToCrypto,
}) => {
  return (
    <View>
      <View style={styles.inputAndDropdown}>
        <TextInput
          value={cryptos}
          onChangeText={setCryptos}
          keyboardType="number-pad"
          placeholder="Enter value"
          placeholderTextColor="#d4d4d4"
          style={styles.input}
        />

        <View style={styles.USDContainer}>
          <Text style={styles.USDText}>USD</Text>
        </View>
      </View>
      <View style={styles.toUSDContainer}>
        <View style={styles.convertedContainer}>
          <Text style={styles.convertedValue}>{usdToCrypto()}</Text>
        </View>
        <View style={styles.cryptoDropDown}>
          <Menu
            trigger={triggerProps => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}>
                  <Text
                    style={{
                      color: '#d4d4d4',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {selectedCrypto ? selectedCrypto : 'Select'}
                  </Text>
                </Pressable>
              );
            }}>
            {Object.keys(cryptoRates).map(val => (
              <Menu.Item onPress={() => setSelectedCrypto(val)}>
                {val}
              </Menu.Item>
            ))}
          </Menu>
          <Image source={ArrowDown} style={styles.downArrow} />
        </View>
      </View>
    </View>
  );
};

export default USDToCrypto;

const styles = StyleSheet.create({
  inputAndDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#171717',
    color: '#d4d4d4',
    padding: 10,
    width: '60%',
    height: 60,
    fontSize: 16,
  },
  cryptoDropDown: {
    width: '27%',
    backgroundColor: '#171717',
    padding: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedCrypto: {
    color: '#d4d4d4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  downArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  toUSDContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  convertedContainer: {
    backgroundColor: '#171717',
    color: '#d4d4d4',
    padding: 10,
    width: '60%',
    height: 60,
    fontSize: 16,
    justifyContent: 'center',
  },
  convertedValue: {
    color: '#d4d4d4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  USDContainer: {
    width: '27%',
    backgroundColor: '#171717',
    padding: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  USDText: {
    color: '#d4d4d4',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
