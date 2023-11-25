import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Sensor } from "../../models/Sensor";

const router = express.Router();

router.get("/sensor", [], async (req: Request, res: Response) => {
  const sensor = await Sensor.find({});
  return res.status(200).send(sensor);
});

router.get("/sensor/:id", [], async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sensor = await Sensor.findOne({ id });

    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    return res.status(200).json(sensor);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/sensor", async (req: Request, res: Response) => {
  const { id_coletor, id, value, type } = req.body;

  const sensor = Sensor.build({ id_coletor, id, value, type });
  await sensor.save();

  return res.status(201).send(sensor);
});

export { router as sensorRoute };