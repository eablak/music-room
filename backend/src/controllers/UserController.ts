import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";


// create user via email
export const createUser = async (req: Request, res: Response) => {

    const { name, surname, username, email, password, birth_date } = req.body;
    
    if (!email || !password){
        return res.status(400).json({ message: "Email and password is required!"})
    }
    
    const userRepo = AppDataSource.getRepository(User);
    const hashed_pass = await bcrypt.hash(password, 10);

    const saved = await userRepo.save({ name, surname, username, email, hashed_pass, birth_date });
    res.json(saved);

};


export const getUsers = async (req: Request, res: Response) => {

    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();
    res.json(users);

};