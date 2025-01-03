import axios from 'axios';
import { useState } from 'react';

type CepInfo = { localidade: string | null; uf: string | null } | null;

export const useGetCepInfo = async (cep: string) => {
  let isLoading: boolean = false;
  let data: CepInfo = null;
  try {
    isLoading = true;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    data = {
      localidade: response.data.localidade || null,
      uf: response.data.uf || null,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    data = {
      localidade: null,
      uf: null,
    };
  } finally {
    isLoading = false;
  }
  return { data, isLoading };
};
