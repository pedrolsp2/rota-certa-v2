/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Token } from '@/types/Authentication';
import { setItem } from '@/utils/storage';
import { ImmerStateCreator } from '..';

type AuthStore = Token;

type AuthActions = {
  login: (user: Token) => void;
  logout: () => void;
};

export type AuthSlice = AuthStore & AuthActions;

const initialState: AuthStore = {
  cep: '',
  createdAt: '',
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
  user: '',
  idUser: '',
};

export const useAuthSlice: ImmerStateCreator<AuthSlice> = (set) => ({
  ...initialState,
  login: (user) => {
    set((state) => ({ ...state, ...user }));
    setItem('user', user);
  },
  logout: () => {
    set((state) => ({ ...state, token: null, user: null }));
    localStorage.clear();
  },
});
