import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import passport from "passport";
import cors from "cors";
import helmet from 'helmet';

app.use(helmet({
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));
const app = express();

app.use(cors({
    origin: "http://localhost:8081",
}));

app.use(express.json());
app.use("/", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(passport.initialize());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// rate limiting -> securing

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to database.");
        app.listen(3000, () => {
            console.log("Server is running: http://localhost:3000");
        });
    })
    .catch((err) => console.log("Connection error:", err));