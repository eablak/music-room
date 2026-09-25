export interface IAuthUser {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  // profile_photo?: string | null;
}

export interface IAuthSession {
  user: IAuthUser;
  accessToken: string;
  // refreshToken: string;
}

export interface ILoginResponse {
  token: string;
  user: IAuthUser;
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
