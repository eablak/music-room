import express from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {

  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(req.body);
  const saved = await userRepo.save(user);
  res.json(saved);

});

app.get("/users", async (req, res) => {

  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  res.json(users);

})

export default app;