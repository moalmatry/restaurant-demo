// all methods that related to  Authentication & Authorization
import jwt from 'jsonwebtoken';
import AppError from './AppError';
import log from './logger';
import argon2 from 'argon2';
import Crypto from 'crypto';

///////////////////////////////////////////////////////////////
// Jwt methods
export const signJwt = (userId: string) =>
  jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET! as string,
    {
      expiresIn: process.env.JWT_EXPIRES as string,
    },
  );

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as T;
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    log.error(error);
    throw new AppError(`${error.message}`, 401);
  }
};
///////////////////////////////////////////////////////////////
// security related
export const changedPasswordAfter = (jwtTimeStamp: number, updatedAt?: number): boolean => {
  if (!updatedAt) return false;
  const updateTimestamp = Math.floor(updatedAt / 1000);

  if (updateTimestamp > jwtTimeStamp) {
    return true;
  }

  return false;
};

export const generateUniqueRandomNumbers = (count: number, min: number, max: number): number[] => {
  if (max - min + 1 < count) {
    throw new Error('Range is too small to generate unique numbers.');
  }

  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
};

///////////////////////////////////////////////////////////////
// argon methods

export const hashArgon = async (password: string) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
};

export const verifyHashedArgon = async (candidatePassword: string, password: string) => {
  try {
    return await argon2.verify(password, candidatePassword);
  } catch (error) {
    log.error(error, 'Could not validate password');

    return false;
  }
};

export const hashedWithCrypto = (data: string) => Crypto.createHash('sha256').update(data).digest('hex');
