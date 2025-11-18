import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

// Diagnostic handlers to capture uncaught errors and exit reason
process.on('uncaughtException', (err) => {
    console.error('uncaughtException:', err && err.stack ? err.stack : err);
});

process.on('unhandledRejection', (reason) => {
    console.error('unhandledRejection:', reason && reason.stack ? reason.stack : reason);
});

process.on('exit', (code) => {
    console.log('Process exiting with code:', code);
});

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI);
        await connectDB();

        app.on('error', (error) => {
            console.log('ERROR', error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection failed!!", error);
    }
};

startServer();