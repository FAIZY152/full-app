"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const ResturentRoutes_1 = require("./routes/ResturentRoutes");
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const MenuRoute_1 = __importDefault(require("./routes/MenuRoute"));
const DB_1 = __importDefault(require("./utils/DB"));
(0, DB_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5200;
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://foodpandaclone-alpha.vercel.app", // Deployed frontend
];
const corsOptions = {
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
app.use((0, cors_1.default)(corsOptions));
// Your routes her
// Middleware for parsing JSON requests
app.use(body_parser_1.default.json({ limit: "10mb" })); // Parse application/json use(express.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/api/v1/auth", UserRoute_1.default);
app.use("/api/v1/resturent", ResturentRoutes_1.resturentRoute);
app.use("/api/v1/menu", MenuRoute_1.default);
app.use("/api/v1/order", orderRoute_1.default);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
