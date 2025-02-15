import { orders } from "@/constants/data";

export const useGetOrder = (id: string) => {
  const isLoading = true;
  const order = orders.find((order) => order.id === id);

  return { isLoading, order };
};
