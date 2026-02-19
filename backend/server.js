import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mailRoutes from "./routes/mailRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mail", mailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

console.log("EMAIL:", process.env.ADMIN_EMAIL);
console.log("PASS:", process.env.ADMIN_PASS ? "Loaded" : "Missing");
console.log("PASS LENGTH:", process.env.ADMIN_PASS.length);


