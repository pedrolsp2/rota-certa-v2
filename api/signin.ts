/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@/utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { Token } from '@/types/Authentication';

interface LoginData {
  email: string;
  password: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const loginUser = async ({ email, password, setIsLoading }: LoginData) => {
  try {
    setIsLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('Usuário não encontrado no Firestore.');
    }

    const userData = userDoc.data() as Token;

    setIsLoading(false);
    return {
      success: true,
      message: 'Login realizado com sucesso.',
      user: { ...userData, idUser: user.uid },
    };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      let errorMessage = 'Erro ao realizar login.';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Usuário ou senha incorretos.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'O email fornecido é inválido.';
          break;
        default:
          errorMessage = error.message;
          break;
      }

      console.error('Erro ao realizar login:', errorMessage);
      return { success: false, message: errorMessage };
    }

    console.error('Erro inesperado ao realizar login:', error);
    return { success: false, message: 'Erro inesperado ao realizar login.' };
  } finally {
    setIsLoading(false);
  }
};
