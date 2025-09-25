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

projectsRouter.post("/edit_project", async(req, res)=>{
  const newProjectData = req.body;
  let collection = await db.collection("projects");
  
  const projectId = newProjectData._id;
  delete newProjectData._id;

  try {
    const result = await collection.updateOne(
      {_id: new ObjectId(projectId)}, // Convert the string to an ObjectId
      { $set: newProjectData }
    );
    
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Project not found or no changes were made." });
      return;
    }

    res.status(200).json({ 
      message: "Project updated successfully", 
      modifiedCount: result.modifiedCount 
    });
  } catch (err) {
    console.error("Error updating project: ", err);
    // This will catch errors related to invalid ObjectId format
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
});

export default projectsRouter;