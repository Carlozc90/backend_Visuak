import express from "express";
import config from "./config";
const cors = require("cors");
import productsRoutes from "./routes/products.routes";

const app = express();

//cors
app.use(cors());

// settings
app.set("port", config.port || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //raro

app.use(productsRoutes);

export default app;
