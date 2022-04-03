import express from "express";
import config from "./config";

import productsRoutes from "./routes/products.routes";

const app = express();

// settings
app.set("port", config.port || 3000);

app.use(productsRoutes);

export default app;
