import mongoose from "mongoose";
import { ISensor } from "../../interfaces/ISensor";

interface SensorDoc extends mongoose.Document {
  id_coletor: Number;
  id: Number;
  value: Number;
  type: String;
  date: Date;
  unitMeasurement: String;
}

interface SensorModelInterface extends mongoose.Model<SensorDoc> {
  build(attr: ISensor): SensorDoc;
}

const sensorSchema = new mongoose.Schema({
  id_coletor: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  unitMeasurement: {
    type: String,
    required: true,
  },
});

sensorSchema.statics.build = (attr: ISensor) => {
  return new Sensor(attr);
};

const Sensor = mongoose.model<any, SensorModelInterface>(
  "Sensor",
  sensorSchema
);

export { Sensor };
