import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type:String,
      required: true,
    },
    type: {
      type: String,
      enum: ['customer', 'seller']
    }
  }
);
const User = mongoose.model('User', UserSchema);
export default User;
