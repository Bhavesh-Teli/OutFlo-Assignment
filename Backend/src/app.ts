import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB";
import campaignRoutes from "./routes/campaign.routes";
import messageRoutes from "./routes/message.routes";

dotenv.config();
const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/campaigns", campaignRoutes);
app.use("/personalized-message", messageRoutes);


const PORT = process.env.PORT || 3000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        });
    })
    .catch((error:any) => {
        throw error;
    });
