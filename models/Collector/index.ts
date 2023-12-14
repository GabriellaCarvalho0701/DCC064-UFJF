import mongoose from "mongoose";
import { ICollector } from "../../interfaces/ICollector";

interface CollectorDoc extends mongoose.Document {
  id: Number;
  localization: String;
  created_at: Date;
  closing_in?: Date;
}

interface CollectorModelInterface extends mongoose.Model<CollectorDoc> {
  build(attr: ICollector): CollectorDoc;
}

const collectorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  localization: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  closing_in: {
    type: Date,
    required: false,
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
