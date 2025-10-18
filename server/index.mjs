import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.mjs";
import bcrypt from 'bcryptjs'
import db from "./db/conn.mjs";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

async function comparePasswordHash(email, plainPassword) {
  try {
    // 1. Find the admin in the database by email
    // Replace this with your actual DB query logic.
    let collection = await db.collection("users");
    const admin = await collection.findOne({ email: email });
    
    // Example with a Mongoose model:
    // const admin = await Admin.findOne({ email });

    if (!admin) {
      // Admin not found
      return false;
    }

    // 2. Get the stored password hash from the database object
    const storedHash = admin.password; // Assuming the hash is stored in 'password' field

    // 3. Compare the plain-text password with the stored hash
    // bcrypt.compare is asynchronous and handles the salt.
    const isMatch = await bcrypt.compare(plainPassword, storedHash);

    return isMatch;
  } catch (error) {
    console.error("Error during password comparison or database query:", error);
    // Best practice: return false on error to prevent sign-in on unexpected failure
    return false;
  }
}

app.post("/admin-sign-in", async (req, res) => {
  // Destructure the credentials from the request body
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Call the function to check the credentials
  const passwordIsValid = await comparePasswordHash(email, password);

  if (passwordIsValid) {
    // SUCCESSFUL SIGN-IN
    // 🔑 Here you would typically create a session (e.g., JWT or session cookie)
    // and send it back to the client for subsequent authorized requests.

    return res.status(200).json({
      message: "Sign In successful",
      // token: yourGeneratedJWT
    });
  } else {
    // FAILED SIGN-IN
    // Use a generic error message for security (don't reveal if it's the email or password that's wrong)
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }
});

app.use("/projects", projectsRouter);
