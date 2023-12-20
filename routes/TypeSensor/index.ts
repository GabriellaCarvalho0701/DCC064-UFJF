import express, { Request, Response } from "express";
import { TypeSensor } from "../../models/TypeSensor";
import mongoose from "mongoose";

const router = express.Router();

//LIST
router.get("/typesensor/", [], async (req: Request, res: Response) => {
  const typeSensor = await TypeSensor.find({});
  return res.status(200).json(typeSensor);
});

//FIND
router.get("/typesensor/:id", [], async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid ObjectId -> ID TypeSensor not found in the collector",
    });
  }

  const _id = new mongoose.Types.ObjectId(id);

  const typeSensor = await TypeSensor.findOne({
    _id,
  });

  if (!typeSensor) {
    return res
      .status(404)
      .json({ message: "ID TypeSensor not found in the collector" });
  }

  return res.status(200).json(typeSensor);
});

//CREATE
router.post("/typesensor", async (req: Request, res: Response) => {
  const { type } = req.body;

  const typeSensorAlreadyExists = await TypeSensor.findOne({ type });

  if (typeSensorAlreadyExists) {
    return res.status(404).json({ message: "Sensor Type already registered" });
  }

  const typeSensor = TypeSensor.build({ type });
  await typeSensor.save();

  return res.status(201).send(typeSensor);
});

//UPDATE
router.put("/typesensor/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid ObjectId -> ID TypeSensor not found in the collector",
    });
  }

  const _id = new mongoose.Types.ObjectId(id);

  const typeSensor = await TypeSensor.findOne({
    _id,
  });

  if (!typeSensor) {
    return res
      .status(404)
      .json({ message: "ID TypeSensor not found in the collector" });
  }

  typeSensor.type = type;

  await typeSensor.save();
  return res.status(200).send(typeSensor);
});

//DELETE
router.delete("/typesensor/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid ObjectId -> ID TypeSensor not found in the collector",
    });
  }

  try {
    const _id = new mongoose.Types.ObjectId(id);

    const typeSensor = await TypeSensor.findOneAndDelete({ _id });

    if (!typeSensor) {
      return res
        .status(404)
        .json({ message: "ID TypeSensor not found in the collector" });
    }

    return res
      .status(200)
      .json({ message: "ID TypeSensor deleted in the collector" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as typeSensorRoute };
