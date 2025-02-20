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

app.use(
  cors({
    origin: "https://foodpandalike.vercel.app", // Allow requests from frontend
    credentials: true, // Enable cookies & authentication headers
  })
);

// Sample API route

// Middleware for parsing JSON requests
app.use(bodyParser.json({ limit: "10mb" })); // Parse application/json use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/auth/cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

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
