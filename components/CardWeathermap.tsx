/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useOpenWeatherMap } from '@/api/openweathermap';
import { firstUpperCase } from '@/utils/formatString';
import {
  Cloud,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRainWind,
  CloudSun,
  Cloudy,
  Snowflake,
  Sun,
} from 'lucide-react-native';

interface CardWeathermapProps {
  props: string;
}

const CardWeathermap: React.FC<CardWeathermapProps> = ({ props }) => {
  const { weather, isLoading } = useOpenWeatherMap(props);

  const Icon = {
    '01d': Sun,
    '02d': CloudSun,
    '03d': Cloud,
    '04d': Cloudy,
    '09d': CloudHail,
    '10d': CloudRainWind,
    '11d': CloudLightning,
    '13d': Snowflake,
    '50d': CloudFog,
  };

  const gradiente = {
    '01d': ['#49b8fc', '#87CEFA'],
    '02d': ['#19a3f7', '#60bff7'],
    '03d': ['#fafafa', '#dadada'],
    '04d': ['#707070', '#dadada'],
    '09d': ['#0279bf', '#22a5f2'],
    '10d': ['#0d8fdb', '#45b5f7'],
    '11d': ['#49b8fc', '#87CEFA'],
    '13d': ['#49b8fc', '#87CEFA'],
    '50d': ['#49b8fc', '#87CEFA'],
  };

  //@ts-ignore
  const WeatherIcon = Icon[weather?.weather?.[0]?.icon || '01d'];
  //@ts-ignore
  const WeatherGradient = gradiente[weather?.weather?.[0]?.icon || '01d'];

  return (
    <LinearGradient
      colors={WeatherGradient}
      style={{
        borderRadius: 10,
        padding: 16,
        marginVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      }}>
      {isLoading ? (
        <View style={{ height: 80, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : weather ? (
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text
              style={{
                fontSize: 50,
                fontWeight: 'bold',
                color: '#ffffff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}>
              {weather?.main?.temp?.toFixed(0)}°
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#fafafa',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}>
              {firstUpperCase(weather?.weather?.[0]?.description || '')}
            </Text>
          </View>
          <WeatherIcon size={100} style={{ position: 'absolute', right: -45 }} color="#fff" />
        </View>
      ) : (
        <Text style={{ textAlign: 'center', color: '#ffffff' }}>Erro ao carregar os dados</Text>
      )}
    </LinearGradient>
  );
};

export default CardWeathermap;
