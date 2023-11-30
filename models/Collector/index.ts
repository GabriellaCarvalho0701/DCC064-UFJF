import mongoose from "mongoose";
import { ICollector } from "../../interfaces/ICollector";

interface CollectorDoc extends mongoose.Document {
  id: Number;
}

interface CollectorModelInterface extends mongoose.Model<CollectorDoc> {
  build(attr: ICollector): CollectorDoc;
}

const collectorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
});

collectorSchema.statics.build = (attr: ICollector) => {
  return new Collector(attr);
};

const Collector = mongoose.model<any, CollectorModelInterface>(
  "Collector",
  collectorSchema
);

export { Collector };
