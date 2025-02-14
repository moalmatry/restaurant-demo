import mongoose, { Schema } from 'mongoose';
import { ICategory } from './types';

// 1- Create Interface

// 2- Create Schema
const categorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
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

const setImageURL = (doc: ICategory) => {
  if (doc?.image?.startsWith('http')) return;

  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

// findOne, findAll and update
categorySchema.post('init', (doc) => {
  setImageURL(doc as ICategory);
});

// create
categorySchema.post('save', (doc) => {
  setImageURL(doc as ICategory);
});

// 3- Create model

export default mongoose.model<ICategory>('Category', categorySchema);
