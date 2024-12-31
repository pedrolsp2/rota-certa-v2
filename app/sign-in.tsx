/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react-native';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { primary } from '@/config/colors';
import { router } from 'expo-router';
import { loginUser } from '../api/signin';
import { setItem } from '@/utils/storage';
import { Store, useStoreBase } from '@/store';

const stateSelector = (state: Store) => ({
  login: state.login,
});

const schema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  const { login } = useStoreBase(stateSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    const { message, success, user } = await loginUser({ ...data, setIsLoading });
    Alert.alert(success ? 'Sucesso!' : 'Erro!', message);
    if (success) {
      reset();
      setItem('user', user);
      login(user!);
      router.replace('/');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-neutral-900">
      <View className="my-8 flex-1 justify-between px-6">
        <View className="container mt-12">
          <Text className="text-5xl font-extrabold text-primary-500">Bem-vindo!</Text>
          <Text className="text-lg text-neutral-500 dark:text-neutral-300">
            Faça login para continuar.
          </Text>
        </View>

        <View className="container gap-4">
          <View>
            <Label>Email</Label>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  {...register('email')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  className={errors.email ? 'border-red-500' : ''}
                />
              )}
              name="email"
            />
          </View>

          <View>
            <Label>Senha</Label>
            <View className="relative">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    {...register('password')}
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    className={errors.password ? 'border-red-500' : ''}
                  />
                )}
                name="password"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3">
                {showPassword ? (
                  <EyeOff size={20} color={primary[400]} />
                ) : (
                  <Eye size={20} color={primary[500]} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="container mt-12">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="mt-6 flex items-center justify-center rounded-lg bg-primary-500 py-3">
            <Text className="text-center text-lg font-semibold text-white">
              {isLoading ? <ActivityIndicator size="small" color="#fff" /> : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/sign-up')}>
            <Text className="mt-2 text-center text-neutral-600 dark:text-neutral-300">
              Não tem uma conta? <Text className="font-semibold text-primary-500">Registre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
