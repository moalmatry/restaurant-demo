import { orders } from "@/constants/data";

export const useGetOrders = () => {
  const isLoading = false;

  return { isLoading, orders };
};
