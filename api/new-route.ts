/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { FormDataRoute } from '@/app/(tabs)/nova-rota';
import { firestore } from '@/utils/firebase';
import axios from 'axios';
import { uuid } from 'expo-modules-core';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useCallback } from 'react';

export const useNewRoute = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ success: boolean; message: string }>({
    success: false,
    message: '',
  });

  const fetchCoordinates = useCallback(
    async ({ cep, name, number, idUser }: FormDataRoute & { idUser: string }) => {
      if (!cep) {
        setStatus({ success: false, message: 'CEP não informado.' });
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const {
          logradouro: street,
          localidade: city,
          uf,
          bairro: neighborhood,
          cep: zip,
          erro,
        } = response.data;
        if (erro) {
          setStatus({ success: false, message: 'CEP não encontrado.' });
          return;
        }
        const baseUrl = `https://us1.locationiq.com/v1/search.php`;
        const params = new URLSearchParams({
          key: process.env.EXPO_PUBLIC_LOCATION_IQ as string,
          street,
          city,
          postalcode: zip,
          country: 'Brasil',
          format: 'json',
          limit: '1',
        });

        const coordResponse = await fetch(`${baseUrl}?${params.toString()}`);
        const coordData = await coordResponse.json();

        if (coordData.length > 0) {
          const { lat: latitude, lon: longitude } = coordData[0];
          const data = {
            latitude,
            longitude,
            street,
            zip,
            neighborhood,
            uf,
            name,
            number,
            city,
            idUser,
          };

          try {
            await setDoc(doc(firestore, 'route', `${idUser}|${uuid.v4()}`), {
              ...data,
              createdAt: new Date().toISOString(),
            });
            setStatus({ success: true, message: 'Criada com sucesso!' });
          } catch (error) {
            console.error('Erro ao salvar rota:', error);
            setStatus({ success: false, message: 'Erro ao salvar rota' });
          }
        } else {
          setStatus({ success: false, message: 'Endereço não encontrado.' });
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setStatus({ success: false, message: 'Erro ao buscar informações.' });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, status, fetchCoordinates };
};
