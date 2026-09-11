import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";


const app = express();

app.use(express.json());
app.use("/", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


AppDataSource.initialize()
    .then(() => {
        console.log("Connected to database.");
        app.listen(3000, () => {
            console.log("Server is running: http://localhost:3000");
        });
    })
    .catch((err) => console.log("Connection error:", err));