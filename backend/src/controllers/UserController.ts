import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {

    const userRepo = AppDataSource.getRepository(User);

    const { name, surname, username, birth_date } = req.body;
    const saved = await userRepo.save({ name, surname, username, birth_date });

    res.json(saved);

};

export const getUsers = async (req: Request, res: Response) => {

    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();
    res.json(users);

};