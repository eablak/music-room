import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {

    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create(req.body);
    const saved = await userRepo.save(user);
    res.json(saved);

};

export const getUsers = async (req: Request, res: Response) => {

    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();
    res.json(users);

};