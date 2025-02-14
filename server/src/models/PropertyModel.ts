import mongoose, { Schema } from 'mongoose';
import { IProperty } from './types';

// 1- Create Interface
// 2- Create Schema
const propertySchema: Schema<IProperty> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      minlength: [3, 'Too short Property title'],
      maxlength: [32, 'Too long Property title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
      minlength: [20, 'Too short Property description'],
    },
    address: {
      type: String,
      required: [true, 'Property address is required'],
      minlength: [5, 'Too short Property address'],
    },
    tag: {
      type: String,
      default: 'recommendation',
    },
    area: {
      type: Number,
      required: [true, 'Property area is required'],
      min: [5, 'Too small Property area'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Property bedrooms is required'],
      min: [1, 'Property should has at least 1 bedroom'],
      default: 1,
    },
    bathrooms: {
      type: Number,
      required: [true, 'Property bathrooms is required'],
      min: [1, 'Property should has at least 1 bathrooms'],
      default: 1,
    },
    facilities: {
      type: [String],
      enum: ['Laundry', 'Car Parking', 'Sports Center', 'Cutlery', 'Gym', 'Swimming pool', 'Wifi', 'Pet Center'],
      required: [true, 'Property facilities is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Property quantity is required'],
      min: [1, 'Property quantity must be at least 0'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Property price is required'],
      min: [1, 'Property price must be at least 1'],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 1,
    },

    imageCover: {
      type: String,
      required: [true, 'Property Image cover is required'],
    },
    images: [String],
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Property must belong to a an user of type agent'],
      validate: {
        validator: () => {},
        message: 'User must be of role agent',
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Property must belong to a category'],
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],

    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal to 1.0'],
      max: [5, 'Rating must be below or equal to 5.0'],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
      min: [0, 'rating cant be less than 0'],
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: {
      virtuals: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v; // Optional: Remove the __v field if you don't need it
      },
    },
    toObject: { virtuals: true },
  },
);

propertySchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// Mongoose query middleware
propertySchema.pre(/^find/, function (next) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.populate({
    path: 'category',
    select: 'name _id',
  });

  next();
});

propertySchema.pre(/^find/, function (next) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.populate({
    path: 'agent',
    select: 'name _id',
  });

  next();
});

const setImageURL = (doc: IProperty) => {
  if (doc.imageCover.startsWith('http')) return;
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/properties/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList: string[] = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};
// findOne, findAll and update
propertySchema.post('init', (doc) => {
  setImageURL(doc as IProperty);
});

// create
propertySchema.post('save', (doc) => {
  setImageURL(doc as IProperty);
});

export default mongoose.model<IProperty>('Property', propertySchema);
