import { baseApi, unwrapEnvelope } from './baseApi';
import { IApiResponse, ILoginRequest, IUserProfile } from '@/src/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResult, ILoginRequest>({
      query: (credentials) => ({
        url: '/users/1',
        method: 'GET',
      }),
      transformResponse: (response: unknown, _meta, arg): IAuthResult => {
        const user = response as { id?: number; email?: string; name?: string };
        return {
          accessToken: `demo_${Date.now()}`,
          refreshToken: `refresh_${Date.now()}`,
          user: {
            id: user.id ?? 1,
            email: user.email ?? arg.email,
            firstName: user.name?.split(' ')[0] ?? 'Demo',
            lastName: user.name?.split(' ').slice(1).join(' ') ?? 'User',
          },
        };
      },
      invalidatesTags: ['Profile'],
    }),

    getProfile: builder.query<IUserProfile, void>({
      query: () => '/users/1',
      transformResponse: (response: unknown): IUserProfile => {
        const user = response as Partial<IUserProfile> & { name?: string };
        return {
          id: user.id ?? 1,
          email: user.email ?? 'demo@example.com',
          firstName: user.name?.split(' ')[0] ?? 'Demo',
          lastName: user.name?.split(' ').slice(1).join(' ') ?? 'User',
          createdAt: new Date().toISOString(),
        };
      },
      providesTags: ['Profile'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: '/users/1', method: 'GET' }),
      invalidatesTags: ['Profile', 'Posts'],
    }),
  }),
});

export interface IAuthResult {
  accessToken: string;
  refreshToken: string;
  user: IUserProfile;
}

export type IAuthResultType = IAuthResult;

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;
