import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`;

    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
        console.error('Invalid MongoDB URI. It must start with "mongodb://" or "mongodb+srv://".');
        console.error('Set `MONGODB_URI` in your .env or use a valid connection string.');
        process.exit(1);
    }

    try {
        const connectionInstance = await mongoose.connect(uri);
        console.log(`MongoDB connected successfully !!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed!', error);
        process.exit(1);
    }
}

export default connectDB;
