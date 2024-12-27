/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, Image } from 'react-native';
import { Store, useStoreBase } from '@/store';
import { useOpenWeatherMap } from '../api/openweathermap';
import CardWeathermap from '@/components/CardWeathermap';

const stateSelector = (state: Store) => ({ user: state.name, cep: state.cep });

const Perfil: React.FC = () => {
  const { user, cep } = useStoreBase(stateSelector);

  const { weather, isLoading } = useOpenWeatherMap(cep);

  return (
    <SafeAreaView>
      <View className="p-4">
        <Text className="text-3xl font-bold font-poppins text-primary">Olá, {user}</Text>
        <CardWeathermap props={cep} />
      </View>
    </SafeAreaView>
  );
};

export default Perfil;
