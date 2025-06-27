import mongoose, { Document, Model, Schema, model, models } from 'mongoose';
import { UserType } from '../types/user';

interface IUserSchema extends Document, UserType {
  _id: mongoose.Types.ObjectId;
}

const UserSchema: Schema<IUserSchema> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
});

const User: Model<IUserSchema> = models.User || model<IUserSchema>('User', UserSchema);

export default User;
