import express, { Request, Response } from "express";
import { Collector } from "../../models/Collector";
import { Sensor } from "../../models/Sensor";

const router = express.Router();

router.get("/collector", [], async (req: Request, res: Response) => {
  try {
    const collectors = await Collector.find({});

    const collectorsWithSensors = await Promise.all(
      collectors.map(async (collector) => {
        const sensors = await Sensor.find({ id_coletor: collector.id });
        return {
          collector,
          sensors,
        };
      })
    );

    return res.status(200).json(collectorsWithSensors);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.get("/collector/:id", [], async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const collector = await Collector.findOne({ id });

    if (!collector) {
      return res.status(404).json({ message: "Collector not found" });
    }

    const sensors = await Sensor.find({ id_coletor: collector.id });

    return res.status(200).json({ collector, sensors });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/collector", async (req: Request, res: Response) => {
  const { id } = req.body;

  const collector = Collector.build({ id });
  await collector.save();

  return res.status(201).send(collector);
});

export { router as collectorRoute };
