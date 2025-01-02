/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { Store, useStoreBase } from '@/store';
import CardWeathermap from '@/components/CardWeathermap';
import { Clock, MapPin, Package, PlusCircle } from 'lucide-react-native';

const stateSelector = (state: Store) => ({ user: state.name, cep: state.cep });

const Perfil: React.FC = () => {
  const { user, cep } = useStoreBase(stateSelector);

  const info = [
    { id: 1, title: 'A entregar', Icon: '🚚', value: 3 },
    { id: 2, title: 'Em andamento', Icon: '🚧', value: 5 },
    { id: 3, title: 'Concluído', Icon: '🏁', value: 10 },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex flex-col justify-between p-5 border rounded-md w-44 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-4xl">{item.Icon}</Text>
        <Text className="text-2xl font-bold text-neutral-900 dark:text-white">{item.value}</Text>
      </View>
      <Text className="mt-3 text-base font-medium text-neutral-700 dark:text-neutral-300">
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <View className="relative p-2">
        <Text className="text-3xl font-bold font-poppins text-primary">Olá, {user || ''}</Text>
        <CardWeathermap props={cep} />
        <View className="flex flex-col w-full mb-6">
          <Text className="mb-2 text-lg font-medium text-neutral-700 dark:text-neutral-300">
            Atividades
          </Text>
          <FlatList
            data={info}
            keyExtractor={({ id }) => String(id)}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="flex flex-col w-full">
          <Text className="mb-2 text-lg font-medium text-neutral-700 dark:text-neutral-300">
            Ações
          </Text>
          <View className="flex flex-row flex-wrap items-center justify-center gap-4">
            <View className="relative flex items-center justify-center w-48 border rounded-lg h-36 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
              <PlusCircle color="#10b981" size={48} />
              <Text className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                Nova Encomenda
              </Text>
            </View>
            <View className="relative flex items-center justify-center w-48 border rounded-lg h-36 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
              <MapPin color="#0ea5e9" size={48} />
              <Text className="text-sm font-medium text-sky-600 dark:text-sky-500">Gerar Rota</Text>
            </View>
            <View className="relative flex items-center justify-center w-48 border rounded-lg h-36 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
              <Package color="#f97316" size={48} />
              <Text className="mt-2 text-sm font-medium text-amber-600 dark:text-amber-500">
                Ver Encomendas
              </Text>
            </View>

            <View className="relative flex items-center justify-center w-48 border rounded-lg h-36 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
              <Clock color="#525252" size={48} />
              <Text className="mt-2 text-sm font-medium text-neutral-600">Histórico</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;
