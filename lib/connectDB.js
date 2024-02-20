import mongoose from 'mongoose';

const DB = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// Variable to track the connection status
let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (!DB) {
    return console.log(
      'Please define the DATABASE_URL environment variable inside .env.local'
    );
  }

  if (isConnected) return console.log('=> using existing database connection.');

  try {
    await mongoose.connect(DB);

    isConnected = true;

    console.log('MongoDB Connected');
  } catch (error) {
    console.log({ err: error, msg: 'Error connecting to MongoDB' });
  }
};
