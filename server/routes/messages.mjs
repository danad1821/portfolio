import db from "../db/conn.mjs";
import express from 'express';
import { ObjectId } from "mongodb";
const messagesRouter = express.Router();

messagesRouter.post("/send", async (req, res) =>{
    console.log("Added to db")
    let collection = await db.collection("messages");
    await collection.insertOne(req.body);
    res.status(200);
});


export default messagesRouter;