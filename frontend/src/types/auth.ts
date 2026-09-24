export interface IAuthUser {
  id: string;
  email: string;
}

export interface IAuthSession {
  user: IAuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthContextValue {
  session: IAuthSession | null;
  user: IAuthUser | null;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
