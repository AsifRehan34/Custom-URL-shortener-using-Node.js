import mongoose from 'mongoose';

export function connectToMongoDB(url) {
  return mongoose.connect(url);
}
