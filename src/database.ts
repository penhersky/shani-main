import mongoose from 'mongoose';
import { logInfo, logError } from './lib/logger';

export default async (url: string) => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    logInfo(`Connect to mongodb! ${url}`);
  } catch (error) {
    logError(error, 'connect to mongodb error');
  }
};
