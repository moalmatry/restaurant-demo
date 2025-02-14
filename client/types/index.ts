export type Role = "ADMIN" | "USER" | "EMPLOYEE";
export interface User {
  id: string;
  name: string;
  slug?: string;
  email: string;
  phone: string;
  profileImg?: string;
  password?: string;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: number;
  passwordResetVerified?: boolean;
  role?: Role;
  active?: boolean;
  wishlist?: string;
  addresses?: {
    _id: string;
    alias: string;
    details: string;
    phone: string;
    city: string;
    postalCode: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
}

export interface IProperty {
  title: string;
  slug: string;
  description: string;
  address: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  facilities: string[];
  agent: string | { name: string; id: string };
  quantity: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number;
  tag: string;
  imageCover: string;
  images?: string[];
  category: string | { name: string; id: string };
  subcategories?: string | { name: string; id: string };
  ratingsAverage?: number;
  ratingsQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/////////////////////////////// NOTE: Services

/* User and Auth */
export interface Response {
  status: "success" | "fail";
  message?: string;
  results?: number;
  limit?: number;
  currentPage?: number;
  numberOfPages?: number;
  next?: number;
}

export interface UserResponse extends Response {
  token: string;
  data: User;
}

export interface Register {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone: string;
}
export interface RegisterProps {
  userData: Register;
}

export interface ResetPasswordProps {
  userData: { resetCode: string; password: string; confirmPassword: string };
}

export interface ResetPasswordResponse extends Response {
  token: string;
}
/* Properties */

export interface AllPropertiesResponse extends Response {
  data: IProperty[];
}
