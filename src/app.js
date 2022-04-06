import express from "express";
import config from "./config";
const cors = require("cors");
const cookieParser = require("cookie-parser");
import productsRoutes from "./routes/products.routes";

const app = express();

//cors
app.use(cors());

//cookies
app.use(cookieParser());

// settings
app.set("port", config.port);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(productsRoutes);

export default app;
