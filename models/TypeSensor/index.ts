import mongoose from "mongoose";
import { ITypeSensor } from "../../interfaces/ITypeSensor";

interface TypeSensorDoc extends mongoose.Document {
  type: String;
}

interface TypeSensorModelInterface extends mongoose.Model<TypeSensorDoc> {
  build(attr: ITypeSensor): TypeSensorDoc;
}

const typeSensorSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

typeSensorSchema.statics.build = (attr: ITypeSensor) => {
  return new TypeSensor(attr);
};

const TypeSensor = mongoose.model<any, TypeSensorModelInterface>(
  "TypeSensor",
  typeSensorSchema
);

export { TypeSensor };
