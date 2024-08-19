import express from 'express';
import { connectToMongoDB } from './connections.js';
import urlRoute from './routes/url.js';
import path from 'path';
import staticRoute from './routes/staticRouter.js';


const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

// set view engine using ejs 
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

// Use the routes defined in the urlRoute
app.use("/url", urlRoute);

// create route for static Route
app.use('/',staticRoute);

app.listen(PORT, () => console.log("Server started at port:", PORT));
