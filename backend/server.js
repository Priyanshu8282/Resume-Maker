import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import connectDb from './config/db.js';
import registerRoute from './routes/registerRoute.js';
import path from 'path';
import studentRoute from './routes/studentRoute.js';
import loginRoute from './routes/loginRoute.js';
import logoutRoute from './routes/logoutRoute.js'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';



const app = express();
app.use(cookieParser());
const port = 5000;
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(cors({
  origin: 'https://resume-maker-teal-zeta.vercel.app/', // Replace with your frontend's origin
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Connect to database
connectDb();
// Configure session middleware
app.use(session({
  secret: 'process.env.SECRET_KEY', // Replace with a strong secret key from an environment variable
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb+srv://resume:resume@resume.zghwv.mongodb.net/?retryWrites=true&w=majority&appName=resume', // Replace with your MongoDB connection string
    collectionName: 'sessions' 
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true, // Ensures the cookie is only accessible via HTTP(S) requests, not JavaScript
   securet: true, // Ensures the cookie is only sent over HTTPS
    sameSite: 'strict', // Helps mitigate CSRF attacks
  }
}));

// Use routes
app.use('/api', studentRoute);
app.use('/auth', registerRoute);
app.use('/auth', loginRoute);
app.use("/auth",logoutRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
