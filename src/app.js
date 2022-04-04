import express from "express";
import config from "./config";
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
import productsRoutes from "./routes/products.routes";

const app = express();

// allow the app to use cookieparser
app.use(helmet());

// cookies
app.use(cookieParser());

//cors
app.use(cors());

// settings
app.set("port", config.port || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(productsRoutes);

export default app;
