/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Weathermap } from '@/types/Weathermap';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useOpenWeatherMap = (cep: string) => {
  const [weather, setWeather] = useState<Weathermap | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCep = async () => {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return {
          localidade: response.data.localidade || null,
          uf: response.data.uf || null,
        };
      } catch (error) {
        console.error('Error fetching location:', error);
        return {
          localidade: null,
          uf: null,
        };
      }
    };

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const { localidade, uf } = await getCep();
        if (!localidade) {
          throw new Error('Invalid location');
        }
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${localidade},BR&appid=fc46efc49169460fb1f840f0c17f51a3&units=metric&lang=pt`
        );
        setWeather({ ...response.data, uf, localidade });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [cep]);

  return { weather, isLoading };
};
