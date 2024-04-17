import mongoose from "mongoose";
import { exit } from "node:process";

// Constant Variable.
const url: string = process.env.MONGODB_URL || "";

// connecting MongoDB.
const MongoDB = {
   open: async () => {
      try {
         await mongoose.connect(url);
         console.log("MongoDB Connected....");
      } catch (error) {
         console.log("MongoDB Not Connected....");
         console.log(error);
      }
   },
   close: async () => {
      try {
         await mongoose.connection.close();
         console.log("DisConnected.....");
      } catch (error) {
         console.log("MongoDB Not DisConnected....");
         exit(0);
      }
   },
};

mongoose.connection.on("open", () => console.log("open"));
mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("close", () => console.log("close"));
mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("reconnected", () => console.log("reconnected"));
mongoose.connection.on("disconnecting", () => console.log("disconnecting"));

export default MongoDB;
