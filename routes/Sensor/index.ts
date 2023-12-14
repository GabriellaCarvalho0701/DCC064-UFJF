import express, { Request, Response } from "express";
import { Sensor } from "../../models/Sensor";
import { Collector } from "../../models/Collector";
import { TypeSensor } from "../../models/TypeSensor";

const router = express.Router();

//LIST
router.get("/sensor/:id_collector", [], async (req: Request, res: Response) => {
  const { id_collector } = req.params;

  try {
    const sensors = await Sensor.find({ id_coletor: id_collector });
    return res.status(200).json({
      sensors,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

//FIND
router.get(
  "/sensor/:id_collector/:id",
  [],
  async (req: Request, res: Response) => {
    const { id_collector, id } = req.params;

    try {
      const sensor = await Sensor.findOne({
        id_coletor: id_collector,
        id: id,
      });

      if (!sensor) {
        return res
          .status(404)
          .json({ message: "ID Sensor not found in the collector" });
      }

      return res.status(200).json(sensor);
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

//CREATE
router.post("/sensor", async (req: Request, res: Response) => {
  const { id_coletor, id, value, type, date, unitMeasurement } = req.body;

  const collector = await Collector.findOne({ id: id_coletor });

  if (!collector) {
    return res.status(404).json({ message: "Collector not found" });
  }

  const typeSensor = await TypeSensor.findOne({ type });

  if (!typeSensor) {
    return res.status(404).json({ message: "Type sensor not exists" });
  }

  const sensorAlreadyExist = await Sensor.findOne({ id_coletor, id });

  if (sensorAlreadyExist) {
    return res.status(404).json({ message: "Sensor with ID already exists" });
  }

  const sensor = Sensor.build({
    id_coletor,
    id,
    value,
    type,
    date,
    unitMeasurement,
  });
  await sensor.save();

  return res.status(201).send(sensor);
});

//UPDATE
router.put("/sensor/:id_collector/:id", async (req: Request, res: Response) => {
  const { id_collector, id } = req.params;
  const { value, type, date } = req.body;

  const sensor = await Sensor.findOne({
    id_coletor: id_collector,
    id: id,
  });

  if (!sensor) {
    return res
      .status(404)
      .json({ message: "ID Sensor not found in the collector" });
  }

  sensor.value = value;
  sensor.type = type;
  sensor.date = date;

  await sensor.save();
  return res.status(200).send(sensor);
});

router.delete(
  "/sensor/:id_collector/:id",
  async (req: Request, res: Response) => {
    const { id_collector, id } = req.params;

    const sensor = await Sensor.findOneAndDelete({
      id_coletor: id_collector,
      id: id,
    });

    if (!sensor) {
      return res
        .status(404)
        .json({ message: "ID Sensor not found in the collector" });
    }

    return res.status(200).json({ message: "Sensor deleted successfully" });
  }
);

export { router as sensorRoute };
