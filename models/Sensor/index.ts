import mongoose from "mongoose";
import { ISensor } from "../../interfaces/ISensor";
import { IRegister } from "../../interfaces/IRegister";

interface SensorDoc extends mongoose.Document {
  id_coletor: Number;
  id: Number;
  value: Array<IRegister>;
  type: String;
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
    type: Array<IRegister>,
  },
  type: {
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
