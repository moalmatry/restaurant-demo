import Review from '../models/ReviewModel';

export const userHasReview = async (userId: string, productId: string) =>
  await Review.findOne({ user: userId, product: productId });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteReview = async (id: any) => await Review.findByIdAndDelete(id);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getReviewById = async (id: string | any) => Review.findById(id);
