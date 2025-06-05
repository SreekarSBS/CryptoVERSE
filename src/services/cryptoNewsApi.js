import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const cryptoNewsHeaders = {
  'x-rapidapi-key': '1dfd8c43b6msh7bb870395daac58p1c733bjsn4a7f6c903cb',
  'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com',
};

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', cryptoNewsHeaders['x-rapidapi-key']);
      headers.set('x-rapidapi-host', cryptoNewsHeaders['x-rapidapi-host']);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => `/v1/cryptodaily`,  // Updated API endpoint
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
