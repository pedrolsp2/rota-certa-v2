import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { getItem } from '@/utils/storage';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        console.log('Iniciando verificação do usuário...');
        const user = await getItem('user');
        console.log('Usuário encontrado:', user);

        if (!user) {
          console.log('Nenhum usuário encontrado. Redirecionando para login...');
          router.replace('/sign-in');
          return null;
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      } finally {
        console.log('Finalizando verificação do usuário...');
        setIsLoading(true);
      }
    };

    checkUser();
  }, []);

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Text className="font-poppins text-primary">Home</Text>
      <Text className="text-primary">Home</Text>
    </>
  );
}
