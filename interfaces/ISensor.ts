import mongoose from "mongoose";

interface ISensor {
  id_coletor: Number;
  id: Number;
  value: Number;
  type: String;
  date: Date;
}

export { ISensor };
