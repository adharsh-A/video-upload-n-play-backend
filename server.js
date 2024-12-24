import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js';
import connectDB from './config/connectDB.js';

const app = express();

// Middleware
const corsOptions = {
    origin: ["https://jumpsquad.vercel.app", "http://localhost:5173"], // Allows this specific origin
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');


// Connect to MongoDB
connectDB(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
// Routes
app.use('/api', videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});