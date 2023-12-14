import mongoose from "mongoose";

interface ICollector {
  id: Number;
  localization: String;
  created_at: Date;
  closing_in?: Date;
}

export { ICollector };
