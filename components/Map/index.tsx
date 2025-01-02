/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import SplashLoading from '../SplashLoading';

export default function Map() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = async () => {
    setIsLoading(true);
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setIsLoading(false);
      return;
    }

    const location = await getCurrentPositionAsync({});

    setLocation(location);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getLocation();
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SplashLoading />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.coords?.latitude || 0,
            longitude: location?.coords?.longitude || 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          zoomEnabled
          showsCompass={false}
          showsUserLocation
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
