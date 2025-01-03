/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Switch } from '@/components/Switch';
import { useNewRoute } from '@/api/new-route';
import { Store, useStoreBase } from '@/store';

const stateSelector = (state: Store) => ({
  idUser: state.idUser,
});

const schema = z.object({
  cep: z
    .string()
    .min(8, 'O CEP deve ter pelo menos 8 caracteres')
    .transform((value) => String(value).replace(/[^0-9]/g, '')),
  number: z.string(),
  name: z.string(),
});

export type FormDataRoute = z.infer<typeof schema>;

type OptinsSize = 'Large' | 'Medium' | 'Small';

const NovaRota: React.FC = () => {
  const { idUser } = useStoreBase(stateSelector);
  const [checked, setChecked] = useState<OptinsSize>('Medium');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormDataRoute>({
    resolver: zodResolver(schema),
  });

  const { isLoading, status, fetchCoordinates } = useNewRoute();

  const onSubmit = async (data: FormDataRoute) => {
    fetchCoordinates({ ...data, idUser });
  };

  useEffect(() => {
    if (status?.message) {
      Alert.alert(status.success ? 'Sucesso' : 'Erro', status.message);
    }
    reset({ cep: '38204146', number: '158', name: 'Pedro Lucas' });
  }, [status]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <View className="relative flex flex-col p-2">
        <Text className="text-3xl font-bold font-poppins text-primary">Nova Rota</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 8,
          gap: 8,
        }}>
        <View
          style={{
            flexBasis: '48%',
          }}>
          <View>
            <Label>CEP</Label>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  {...register('cep')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  className={errors.cep ? 'border-red-500' : ''}
                  maxLength={8}
                />
              )}
              name="cep"
            />
          </View>
        </View>
        <View
          style={{
            flexBasis: '48%',
          }}>
          <View>
            <Label>N° residencia</Label>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  {...register('number')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="default"
                  className={errors.number ? 'border-red-500' : ''}
                />
              )}
              name="number"
            />
          </View>
        </View>
        <View className="w-full mt-4">
          <Label>Nome destinatário</Label>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('name')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="default"
                className={errors.name ? 'border-red-500' : ''}
              />
            )}
            name="name"
          />
          <View className="w-full mt-4">
            <Label>Encomenda</Label>
            <View className="flex items-center justify-center w-full border border-dotted rounded-md h-60 border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
              <Camera size={44} color="#707070" />
            </View>
          </View>
          <View className="w-full mt-4">
            <Label>Tamanho da encomenda</Label>
            <View className="flex-row items-center gap-2 mt-1">
              <Switch
                checked={checked === 'Small'}
                onCheckedChange={() => setChecked('Small')}
                nativeID="size-small"
              />
              <Label
                nativeID="size-small"
                onPress={() => {
                  setChecked('Small');
                }}>
                Pequeno
              </Label>
            </View>
            <View className="flex-row items-center gap-2 mt-2">
              <Switch
                checked={checked === 'Medium'}
                onCheckedChange={() => setChecked('Medium')}
                nativeID="size-medium"
              />
              <Label
                nativeID="size-medium"
                onPress={() => {
                  setChecked('Medium');
                }}>
                Médio
              </Label>
            </View>
            <View className="flex-row items-center gap-2 mt-2">
              <Switch
                checked={checked === 'Large'}
                onCheckedChange={() => setChecked('Large')}
                nativeID="size-large"
              />
              <Label
                nativeID="size-large"
                onPress={() => {
                  setChecked('Large');
                }}>
                Grande
              </Label>
            </View>
          </View>
        </View>
        <View className="container mt-8">
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            className="flex items-center justify-center py-3 mt-6 rounded-lg bg-primary-500 ">
            <Text className="text-lg font-semibold text-center text-white">
              {isLoading ? <ActivityIndicator size="small" color="#fff" /> : 'Cadastrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NovaRota;
