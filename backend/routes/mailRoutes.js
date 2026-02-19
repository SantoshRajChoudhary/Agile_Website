import express from "express";
import { sendCareerMail, sendContactMail } from "../controllers/mailController.js";
import { upload } from "../middleware/upload.js";


const router = express.Router();

router.post("/career", upload.single("resume"), sendCareerMail);
router.post("/contact", sendContactMail);
router.post("/career", upload.single("resume"), sendCareerMail);

export default router;
