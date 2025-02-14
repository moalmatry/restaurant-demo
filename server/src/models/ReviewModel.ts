import mongoose, { Schema } from 'mongoose';
import Property from './PropertyModel';
import { IReview } from './types';
// 1- Create Interface
// 2- Create Schema
const reviewSchema: Schema<IReview> = new Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, 'Min ratings value is 1.0'],
      max: [5, 'Max ratings value is 5.0'],
      required: [true, 'Review ratings required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    // parent reference (one to many)
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a Property'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v; // Optional: Remove the __v field if you don't need it
      },
    },
  },
);

reviewSchema.pre(/^find/, function (next) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.populate({ path: 'user', select: 'name' });
  next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId: mongoose.Schema.Types.ObjectId) {
  const result = await this.aggregate([
    // Stage 1: get all reviews in a specific product
    {
      $match: { product: productId },
    },
    // Stage 2: Grouping reviews based on productID and calculating avgRatings, ratingsQuantity
    {
      $group: {
        _id: 'product',
        avgRatings: { $avg: '$ratings' },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  // console.log(result);
  if (result.length > 0) {
    await Property.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRatings,
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await Property.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

// TODO: on old versions of mongoose there is event called remove but now i think they replace it with deleteOne but its not be triggered when delete document (review) from database
reviewSchema.post('deleteOne', async function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

// 3- Create model
export default mongoose.model<IReview>('Review', reviewSchema);
