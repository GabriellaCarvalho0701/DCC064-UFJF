import express, { Request, Response } from "express";
import { Collector } from "../../models/Collector";
import { Sensor } from "../../models/Sensor";

const router = express.Router();

//LIST
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

//FIND
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

//CREATE
router.post("/collector/", async (req: Request, res: Response) => {
  const { id, localization, created_at, closing_in } = req.body;

  const collectorAlreadyExists = await Collector.findOne({ id });
  if (collectorAlreadyExists) {
    return res.status(404).json({ message: "Collector already exists" });
  }

  const collector = Collector.build({
    id,
    localization,
    created_at,
    closing_in,
  });
  await collector.save();

  return res.status(201).send(collector);
});

//UPDATE
router.put("/collector/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { localization, created_at, closing_in } = req.body;

  const collector = await Collector.findOne({ id });

  if (!collector) {
    return res.status(404).json({ message: "Collector not found" });
  }

  // Se localization está sendo alterado, criar um novo collector e fecha o atual
  if (localization !== collector.localization) {
    collector.closing_in = new Date();

    const newCollector = Collector.build({
      id: parseInt(id, 10),
      localization,
      created_at,
      closing_in,
    });

    await newCollector.save();
    await collector.save();
    return res.status(201).send(newCollector);
  }

  // Se closing_in está sendo alterado, atualizar a data final no collector existente
  if (closing_in !== undefined) {
    collector.closing_in = closing_in;
  }

  await collector.save();
  return res.status(200).send(collector);
});

//DELETE
router.delete("/collector/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const sensorsCount = await Sensor.countDocuments({ id_coletor: id });

  if (sensorsCount > 0) {
    return res
      .status(400)
      .json({ message: "Cannot delete collector with associated sensors" });
  }

  const collector = await Collector.findOneAndDelete({ id });

  if (!collector) {
    return res.status(404).json({ message: "Collector not found" });
  }

  return res.status(200).json({ message: "Collector deleted successfully" });
});

export { router as collectorRoute };
