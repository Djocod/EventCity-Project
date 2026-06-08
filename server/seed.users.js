import dotenv from "dotenv";
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import Users from "./model/User.model.js";

dotenv.config();
const users = JSON.parse(await readFile("./JSON/users.json"));

await mongoose.connect(process.env.MONGO_URI);

for (const user of users) {
  await Users.findOneAndUpdate(
    { email: user.email },
    { $set: user },
    { upsert: true, new: true },
  );
}
console.log("Users Successfull !!");
await mongoose.disconnect();
