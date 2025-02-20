import express from "express";
import userRoute from "./routes/UserRoute";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { resturentRoute } from "./routes/ResturentRoutes";
import orderRoute from "./routes/orderRoute";
import menuRoute from "./routes/MenuRoute";
import connectDB from "./utils/DB";

connectDB();

const app = express();
const PORT = process.env.PORT || 5200;

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://foodpandaclone-alpha.vercel.app", // Deployed frontend
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Your routes here
app.get("/", (req, res) => {
  res.json({ message: "CORS configuration successful" });
});

// Middleware for parsing JSON requests
app.use(bodyParser.json({ limit: "10mb" })); // Parse application/json use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/resturent", resturentRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
