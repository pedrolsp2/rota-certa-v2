/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Store, useStoreBase } from '@/store';
import CardWeathermap from '@/components/CardWeathermap';
import Map from '@/components/Map';

const stateSelector = (state: Store) => ({ user: state.name, cep: state.cep });

const Perfil: React.FC = () => {
  const { user, cep } = useStoreBase(stateSelector);

  return (
    <SafeAreaView>
      <View className="p-4">
        <Text className="font-poppins text-3xl font-bold text-primary">Olá, {user || ''}</Text>
        <CardWeathermap props={cep} />
        <Map />
      </View>
    </SafeAreaView>
  );
};

export default Perfil;
