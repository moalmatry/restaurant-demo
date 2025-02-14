import mongoose, { Schema } from 'mongoose';
import { ISubCategory } from './types';

// 2- Create Schema
const subCategorySchema: Schema<ISubCategory> = new Schema(
  {
    name: {
      type: String,
      unique: [true, 'SubCategory must be unique'],
      minlength: [2, 'Too short SubCategory name'],
      maxlength: [32, 'Too long SubCategory name'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to a parent category'],
    },
  },
  { timestamps: true },
);

// 3- Create model
export default mongoose.model<ISubCategory>('SubCategory', subCategorySchema);
