import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import connectDb from './database/db.js';

import userRoute from './routes/userRoute.js';
import path from 'path';

import studentRoute from './routes/studentRoute.js';

import isAuthenticated from './middleware/auth.js'; // Import the middleware

const app = express();
const port = 5000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and form data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5174', // Replace with your frontend's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to database
connectDb();

// Use routes
app.use('/api', isAuthenticated, studentRoute); // Protect all /api routes
app.use('/auth', userRoute);


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});