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
import { registerUser } from './api/signup';

// Schema de validação com Zod
const schema = z
  .object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    user: z.string().min(3, 'O usuário deve ter pelo menos 3 caracteres'),
    cep: z
      .string()
      .min(8, 'O CEP deve ter pelo menos 8 caracteres')
      .transform((value) => String(value).replace(/[^0-9]/g, '')),
    email: z
      .string()
      .email('Digite um email válido')
      .transform((value) => String(value).toLowerCase()),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: z.string().min(6, 'A confirmação deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

export type FormLoginData = z.infer<typeof schema>;

const Registre: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormLoginData>({
    resolver: zodResolver(schema),
  });
  console.log(errors);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const onSubmit = async (data: FormLoginData) => {
    const { message, success } = await registerUser({ data, setIsLoading });
    Alert.alert(success ? 'Sucesso!' : 'Erro!', message);
    if (success) reset();
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-neutral-900">
      <View className="my-4 flex-1 justify-between px-6">
        <View className="container mt-6">
          <Text className="text-5xl font-extrabold text-primary-500">Registrar-se</Text>
        </View>

        <View className="container gap-4">
          <View>
            <Label>Nome</Label>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  {...register('name')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu nome"
                  keyboardType="default"
                  className={errors.name ? 'border-red-500' : ''}
                />
              )}
              name="name"
            />
            <Text className="text-red-500">{errors.name?.message}</Text>
          </View>
          <View>
            <Label>E-mail</Label>
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
            <Text className="text-red-500">{errors.email?.message}</Text>
          </View>

          <View>
            <Label>Usuário</Label>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  {...register('user')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Digite seu nome de usuário"
                  className={errors.user ? 'border-red-500' : ''}
                />
              )}
              name="user"
            />

            <Text className="text-red-500">{errors.user?.message}</Text>
          </View>

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
                  placeholder="Digite seu CEP. EX: 38204-146"
                  keyboardType="number-pad"
                  className={errors.cep ? 'border-red-500' : ''}
                />
              )}
              name="cep"
            />

            <Text className="text-red-500">{errors.cep?.message}</Text>
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
            <Text className="text-red-500">{errors.password?.message}</Text>
          </View>

          <View>
            <Label>Confirme a senha</Label>
            <View className="relative">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    {...register('passwordConfirmation')}
                    secureTextEntry={!showPasswordConfirmation}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    placeholder="Digite sua senha novamente"
                    className={errors.passwordConfirmation ? 'border-red-500' : ''}
                  />
                )}
                name="passwordConfirmation"
              />

              <TouchableOpacity
                onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute right-3 top-3">
                {showPasswordConfirmation ? (
                  <EyeOff size={20} color={primary[400]} />
                ) : (
                  <Eye size={20} color={primary[500]} />
                )}
              </TouchableOpacity>
            </View>
            <Text className="text-red-500">{errors.passwordConfirmation?.message}</Text>
          </View>
        </View>

        <View className="container mt-12">
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            className="mt-6 flex items-center justify-center rounded-lg bg-primary-500 py-3 ">
            <Text className="text-center text-lg font-semibold text-white">
              {isLoading ? <ActivityIndicator size="small" color="#fff" /> : 'Registrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/sign-in')}>
            <Text className="mt-2 text-center text-neutral-600 dark:text-neutral-300">
              Já tem uma conta? <Text className="font-semibold text-primary-500">Fazer login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Registre;
