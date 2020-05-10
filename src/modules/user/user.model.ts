import * as mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

export interface UserAddress {
  line1: string;
  line2: string;
  city: string;
  country: string;
}

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  avatar: string;
  phone: string;
  address: UserAddress;
  tickets: string[];
  isOnboarded: boolean;
}

export const UserSchema = new mongoose.Schema({
  email: { type: String, default: null, required: true, unique: true },
  password: { type: String },
  name: { type: String, default: null, required: true },
  avatar: { type: String, default: null },
  phone: { type: String, default: null },
  address: {
    line1: { type: String, default: null },
    line2: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
  },
  tickets: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', default: null },
  ],
  isOnboarded: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(timestamps);

export const User = mongoose.model<UserModel>('User', UserSchema, 'User');
