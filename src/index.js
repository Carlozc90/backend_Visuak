import app from "./app";
import "./database/connection";

app.listen(app.get("port"));

console.log("hola");
console.log("4");

console.log("server on port", app.get("port"));
