import { SignupProps } from 'index';
import User from '../models/UserModel';
export const signup = async (signupData: SignupProps) => {
  const user = await User.create({
    ...signupData,
  });
  await user.save();
  return user;
};

export const findUser = async (phone: string) => await User.findOne({ phone: phone }).select('+password');
export const findUserById = async (id: string) => await User.findOne({ _id: id });
export const findUserByResetCode = async (hashedCode: string, phone: string) =>
  await User.findOne({
    phone: phone,
    passwordResetCode: hashedCode,
    passwordResetExpires: { $gt: Date.now() },
  });
