import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to database.");
        app.listen(3000, () => {
            console.log("Server is running: http://localhost:3000");
        });
    })
    .catch((err) => console.log("Connection error:", err));