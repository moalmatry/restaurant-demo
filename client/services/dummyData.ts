import { Post } from "@/types/Post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Post[], { limit: number; offset: number }>({
      query: ({ limit, offset }) =>
        `/products?_limit=${limit}&_offset=${offset}`,
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    addNewProduct: builder.mutation<Post, Omit<Post, "id">>({
      query: (newProduct: object) => ({
        url: "/products/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newProduct,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
} = productApi;
