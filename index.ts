import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { sensorRoute } from "./routes/Sensor/index";
import { collectorRoute } from "./routes/Collector";
import { typeSensorRoute } from "./routes/TypeSensor";

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();
app.use(json());
app.use(sensorRoute);
app.use(collectorRoute);
app.use(typeSensorRoute);

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Server is running"))
  .catch((err) => {
    console.error("Error during database connection. \n", err);
  });

const tryConnection = async (port: number) => {
  const uri = `mongodb://10.5.16.131:${port}/test?directConnection=true`;

  try {
    // Tenta conectar
    await mongoose.connect(uri);

    // Verifica se a base de dados 'test' existe
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    if (collections.some((collection) => collection.name === "test")) {
      console.log(`Connected to MongoDB on port ${port} with 'test' database`);
    } else {
      console.log(`Connected to MongoDB on port ${port}`);
    }
  } catch (err) {
    console.error(`Failed to connect to MongoDB on port ${port}.`);
    await mongoose.disconnect();

    // Se a conexão falhar, tenta a próxima porta
    const nextPort = port + 1;
    if (nextPort <= 40003) {
      console.log(`Trying next port: ${nextPort}`);
      await tryConnection(nextPort);
    } else {
      console.error("Unable to connect to MongoDB on any port");
    }
  }
};

// Iniciar a tentativa de conexão a partir da porta 40001
// tryConnection(40001);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
