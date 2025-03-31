import express from "express";
import userRoute from "./routes/UserRoute";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { resturentRoute } from "./routes/ResturentRoutes";
import orderRoute from "./routes/orderRoute";
import menuRoute from "./routes/MenuRoute";
import connectDB from "./utils/DB";

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5200;

// ✅ 1️⃣ Define Allowed Origins
const allowedOrigins = ["https://foodpandalike.vercel.app"];

// ✅ 2️⃣ Configure CORS Properly
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ 3️⃣ Handle Preflight (OPTIONS) Requests for CORS
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://foodpandalike.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// ✅ 4️⃣ Middleware Setup
app.use(bodyParser.json({ limit: "10mb" })); // Parses JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ 5️⃣ Sample Route to Check CORS
app.get("/api/v1/auth/cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// ✅ 6️⃣ Define API Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/resturent", resturentRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// ✅ 7️⃣ Global Middleware to Ensure CORS Headers are Present in All Responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://foodpandalike.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ 8️⃣ Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
