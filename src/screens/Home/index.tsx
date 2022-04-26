import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../RootStackParams';
import Header from '../../components/Header';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();
  const [assets, setAssetsData] = useState('');
  const [activityIndicator, showActivityIndicator] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => getAssets(), [page]);

  const getAssets = () => {
    showActivityIndicator(true);
    Axios.get(
      `https://data.messari.io/api/v1/assets?page=${page}&&with-profiles`,
    ).then(data => {
      if (assets) {
        console.log('saved asset', Object.keys(assets));
        console.log('saved data', Object.keys(data.data));
        let temp = [...assets, ...data.data.data];
        setAssetsData(temp);
      } else {
        setAssetsData(data.data.data);
      }
      showActivityIndicator(false);
      // console.log('bbb=>', data.data);
    });
  };

  const renderItem = ({item, index}) => (
    <View style={styles.listItemContainer}>
      <View style={styles.slugContainer}>
        <Text style={styles.symbolText}>{item?.symbol}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.serialId}>{item?.serial_id}</Text>
        <Text style={styles.nameText}>{item?.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header title={'Home'} />
      {assets && !activityIndicator ? (
        <>
          <Text style={styles.totalResults}>
            Total result: {assets?.length}
          </Text>
          <FlatList
            showHorizontalScrollViewIndicator
            style={{flex: 1, marginVertical: 20}}
            data={assets}
            renderItem={renderItem}
          />
          <TouchableOpacity onPress={() => setPage(page + 1)}>
            <Text style={styles.loadMore}>Load more results</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator style={{flex: 1}} color={'darkgreen'} />
      )}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  listItemContainer: {
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    aligItems: 'center',
    marginTop: 10,
  },
  slugContainer: {
    borderWidth: 1.5,
    borderColor: 'darkgreen',
    borderRadius: 5,
    padding: 10,
  },
  symbolText: {color: '#d4d4d4', fontSize: 20, fontWeight: 'bold'},
  details: {marginLeft: 10, alignSelf: 'center'},
  serialId: {color: '#d4d4d4', fontSize: 16, fontWeight: 'bold'},
  nameText: {color: '#d4d4d4', fontSize: 16, fontWeight: 'bold'},
  totalResults: {
    color: '#d4d4d4',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 22,
  },
  loadMore: {
    color: '#d4d4d4',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
});
