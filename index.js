import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import jwt from "jsonwebtoken";
const app = express();

app.use(bodyParser.json());

const connectionString =
  "mongodb+srv://Tester:Eranga9648@clusterskyrer.8l4tp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSkyrer";

app.use((req, res, next) => {
  const token = req.header("Autherization")?.replace("Bearer", "");
  if (token != null) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        
        next();
      }
    });
  }
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
