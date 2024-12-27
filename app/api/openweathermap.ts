/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Weathermap } from '@/types/Weathermap';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useOpenWeatherMap = (cep: string) => {
  const [weather, setWeather] = useState<Weathermap>({} as Weathermap);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCep = async () => {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data.localidade;
    };

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const { localidade } = await getCep();
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${localidade},BR&appid=fc46efc49169460fb1f840f0c17f51a3&units=metric&lang=pt`
        );
        setWeather(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching weather data:', error);
      }
    };

    setInterval(
      () => {
        fetchWeather();
      },
      5 * 100 * 60
    );
  }, []);
  return { weather, isLoading };
};
