import express from "express";
import { getGalleryItems } from "../controllers/galleryItemController.js";

const galleryItemRouter = express.Router();

galleryItemRouter.post("/", getGalleryItems);
galleryItemRouter.get("/", getGalleryItems);



export default galleryItemRouter;
