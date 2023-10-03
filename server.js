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
app.use(
  cors({
    credentials: true,
    origin: true, //client host
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
