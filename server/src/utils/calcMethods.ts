import { ICart } from '../models/types';

export const calcTotalPrice = (cartItems: ICart) => {
  let totalPrice = 0;
  cartItems.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cartItems.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

export const checkNumberInRange = (str: string, min: number, max?: number) => {
  const num = Number(str);

  if (isNaN(num)) {
    return false;
  }

  if (num < min) {
    return false;
  } else if (max !== undefined && num > max) {
    return false;
  } else {
    return true;
  }
};
