import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any) => {
  const newValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, newValue);
  } catch (error) {
    console.error('Erro ao salvar o nome:', error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Erro ao carregar o nome:', error);
  }
};

export const removeIten = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover o nome:', error);
  }
};
