/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useOpenWeatherMap } from '@/app/api/openweathermap';
import { primary } from '@/config/colors';
import React from 'react';
import { ActivityIndicator, Text, View, Image } from 'react-native';

interface CardWeathermapProps {
  props: string;
}

const CardWeathermap: React.FC<CardWeathermapProps> = ({ props }) => {
  const { weather, isLoading } = useOpenWeatherMap(props);
  return (
    <View className="w-full p-4 my-4 bg-white rounded-lg shadow-sm">
      {isLoading ? (
        <ActivityIndicator size="large" color={primary[500]} />
      ) : weather ? (
        <View className="flex flex-col">
          <View className="flex flex-row items-center gap-2">
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
              }}
              style={{ width: 50, height: 50 }}
            />
            <Text className="text-2xl text-neutral-500">Frutal</Text>
          </View>
          <View className="flex flex-row justify-between my-4">
            <View className="flex flex-col text-lg font-bold text-primary">
              <Text>{weather.weather[0].main}</Text>
              <Text>{weather.main.temp} °C</Text>
            </View>
            <View className="flex flex-col justify-end"></View>
          </View>
        </View>
      ) : (
        <Text>Não foi possível carregar as informações do clima.</Text>
      )}
    </View>
  );
};

export default CardWeathermap;
