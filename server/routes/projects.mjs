import db from "../db/conn.mjs";
import express from 'express';
import { ObjectId } from "mongodb";
const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
  let collection = await db.collection("projects");
  let results = await collection.find({})
    .toArray();
  res.send(results).status(200);
});

projectsRouter.get("/:id", async(req, res) =>{
  const projectId = req.params.id;
  let collection = await db.collection("projects");
  let result = await collection.findOne({_id: new ObjectId(projectId)});
  res.send(result).status(200);
});

export default projectsRouter;