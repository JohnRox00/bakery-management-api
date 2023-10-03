const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./database/dbConnection");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
require("colors");
require("colors");

//configure env
dotenv.config();

//connect to DB
connectDb();

//rest object
const app = express();

//port
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 *  cross-origin-configuration
 * prevent cross origin error and preflight error
 */
const prodOrigin = [process.env.ORIGIN];
const devOrigin = [`http://localhost:3000`];
const allowedOrigins =
  process.env.NODE_ENV === "development" ? prodOrigin : devOrigin;
app.use(
  cors({
    // origin: (origin, callback) => {
    //   if (allowedOrigins.includes(origin)) {
    //     console.log(origin, allowedOrigins);
    //     callback(null, true);
    //   } else callback(new Error("Not allowed by CORS"));
    // },
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

//routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

//rest api
app.get("/", (req, res) => res.send("Server is ready"));

//listen
app.listen(PORT, async () => {
  await console.log(
    `Server is Running at http://localhost:${PORT}`.bgCyan.white
  );
});
