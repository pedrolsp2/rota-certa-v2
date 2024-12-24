/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormLoginData } from '../sign-up';
import { auth, firestore } from '@/utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

interface SignUpData {
  data: FormLoginData;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const registerUser = async ({ data, setIsLoading }: SignUpData) => {
  try {
    setIsLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    await setDoc(doc(firestore, 'users', user.uid), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    setIsLoading(false);
    return { success: true, message: 'Usuário registrado com sucesso' };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      let errorMessage = 'Erro ao registrar usuário.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'O email já está em uso.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'O email fornecido é inválido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha é muito fraca. Escolha uma senha mais forte.';
          break;
        default:
          errorMessage = error.message;
          break;
      }

      console.error('Erro ao registrar usuário:', errorMessage);
      return { success: false, message: errorMessage };
    }

    console.error('Erro inesperado ao registrar usuário:', error);
    return { success: false, message: 'Erro inesperado ao registrar usuário.' };
  } finally {
    setIsLoading(false);
  }
};
