import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.mjs";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/projects", projectsRouter);


