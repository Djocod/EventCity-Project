import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import tokenRoute from "./routes/spotify.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/search", tokenRoute);

// Connection to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB successfull"))
  .catch((err) => console.error("Error connection:", err.message));

const port = process.env.PORT || 8000;

app.listen(3000, () => console.log("Proxy sur http://localhost:3000"));
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
