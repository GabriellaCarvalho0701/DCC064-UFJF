import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { sensorRoute } from "./routes/Sensor/sensor";

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();
app.use(json());
app.use(sensorRoute);

// mongoose
//   .connect("mongodb://localhost:27017/sensor")
//   .then(() => console.log("Server is running"))
//   .catch((err) => {
//     console.error("Error during database connection. \n", err);
//   });

mongoose
  .connect("mongodb://10.5.16.131:40002/test?directConnection=true")
  .then(() => console.log("Server is running"))
  .catch((err) => {
    console.error("Error during database connection. \n", err);
  });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
