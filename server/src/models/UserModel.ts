import mongoose, { Schema } from 'mongoose';
import { hashArgon } from '../utils/authAuth';
import { IUser } from './types';

// 1- Create Interface

// 2- Create Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Too short name'],
      maxlength: [50, 'Too long name'],
      lowercase: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please enter phone number'],
      // unique: [true, 'phone number must be unique'],
      unique: false,
    },
    profileImg: String,

    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [8, 'Too short password'],
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Number,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'AGENT'],
      default: 'USER',
    },
    active: {
      type: Boolean,
      default: true,
    },
    // child reference (one to many)
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
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

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = (await hashArgon(this.password)) || '';
  next();
});

// userSchema.pre<IUser>( async function (next) {
//   console.log(this);
// });

export default mongoose.model<IUser>('User', userSchema);
