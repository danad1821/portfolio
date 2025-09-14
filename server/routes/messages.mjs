import db from "../db/conn.mjs";
import express from 'express';
import { ObjectId } from "mongodb";
const messagesRouter = express.Router();

messagesRouter.post("/send/:data", async (req, res) =>{
    const messageData = JSON.parse(req.params.data);
    console.log(messageData)
    let collection = await db.collection("messages");
    await collection.insertOne(messageData);
    res.status(200);
});


export default messagesRouter;