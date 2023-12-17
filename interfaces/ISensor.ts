import mongoose from "mongoose";
import { IRegister } from "./IRegister";

interface ISensor {
  id_coletor: Number;
  id: Number;
  value: Array<IRegister>;
  type: String;
}

export { ISensor };
