/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getItem, setItem } from '@/utils/storage';
import { Store, useStoreBase } from '@/store';
import Map from '@/components/Map';

const stateSelector = (state: Store) => ({ login: state.login });

export default function Home() {
  const { login } = useStoreBase(stateSelector);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const user = await getItem('user');
        if (!user) {
          router.replace('/sign-in');
          return null;
        }

        login(user);
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      } finally {
        console.log('Finalizando verificação do usuário...');
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View className="dark:bg-neutral-950">
      <Map />
    </View>
  );
}
