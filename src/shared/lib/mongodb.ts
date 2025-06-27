import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO_URL;

if (!MONGODB_URL) throw new Error('Please define mongo environment variable');

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose;

  const opts = {
    bufferCommands: false,
  };

  await mongoose.connect(MONGODB_URL as string, opts);
  return mongoose;
}

export default connectToDatabase;
