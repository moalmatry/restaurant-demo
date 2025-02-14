import User from '../models/UserModel';
export const updateUserData = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any,
  data: { name?: string; email?: string; phone?: string; slug?: string },
) =>
  await User.findOneAndUpdate(
    id,
    {
      ...data,
    },
    { new: true },
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUser = async (id: any) => await User.findByIdAndUpdate(id, { active: false });

export const findUserByAddressId = async (id: string) => await User.findOne({ addresses: { $elemMatch: { _id: id } } });
