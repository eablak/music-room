import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes"

const app = express();
app.use(express.json());
app.use("/", userRoutes);


AppDataSource.initialize()
    .then(() => {
        console.log("Connected to database.");
        app.listen(3000, () => {
            console.log("Server is running: http://localhost:3000");
        });
    })
    .catch((err) => console.log("Connection error:", err));