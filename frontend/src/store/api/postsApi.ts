import { baseApi } from './baseApi';
import { IBaseModel } from '@/src/types';

export interface IPost extends IBaseModel {
  userId: number;
  title: string;
  body: string;
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => '/posts',
      transformResponse: (response: unknown): IPost[] => {
        const posts = (response as Array<Record<string, unknown>>).map((p) => ({
          id: p.id as number,
          userId: p.userId as number,
          title: p.title as string,
          body: p.body as string,
          createdAt: new Date().toISOString(),
        }));
        return posts;
      },
      providesTags: ['Posts'],
    }),

    getPost: builder.query<IPost, number>({
      query: (id) => `/posts/${id}`,
      transformResponse: (response: unknown): IPost => {
        const p = response as Record<string, unknown>;
        return {
          id: p.id as number,
          userId: p.userId as number,
          title: p.title as string,
          body: p.body as string,
          createdAt: new Date().toISOString(),
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = postsApi;
