import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';

import { connectDB } from './lib/db.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statsRoutes from './routes/stats.route.js';
import { create } from 'domain';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this adds auth to the req obj => which user is making the request (req.auth)
app.use(fileUpload( // to handle file uploads
    {
        useTempFiles: true, // store files in temp folder after client uploads a song
        tempFileDir: path.join(__dirname, 'tmp'),
        createParentPath: true, // create the temp folder if it doesn't exist
        limits:{
            fileSize: 10 * 1024 * 1024 // 10 MB file size limit
        },
    }
));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// error handling
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Spotify Clone API!');
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});