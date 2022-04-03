import express from "express";
import config from "./config";

const app = express();

// settings
app.set("port", config.port || 3000);

export default app;
