import express from 'express';
import { connectToMongoDB } from './connections.js';
import urlRoute from './routes/url.js';

const app = express();
const PORT = 8001;

app.use(express.json());

connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

// Use the routes defined in the urlRoute
app.use("/url", urlRoute);

app.listen(PORT, () => console.log("Server started at port:", PORT));
