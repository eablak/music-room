import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { sendVerificationEmail, sendResetPassword } from "../services/EmailService";
import jwt from "jsonwebtoken";
import { signToken } from "../utils/token";


// create user via email
export const createUser = async (req: Request, res: Response) => {

    const { name, surname, username, email, password, birth_date } = req.body;
    
    if (!email || !password){
        return res.status(400).json({ message: "Email and password is required!"})
    }
    

    try{
        const userRepo = AppDataSource.getRepository(User);
        const hashed_pass = await bcrypt.hash(password, 10);

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 24*60*60*1000);

        const saved = await userRepo.save({ 
            name,
            surname,
            username,
            email,
            password: hashed_pass,
            birth_date,
            email_verification_token: token,
            email_verification_expires: expires
        });

        await sendVerificationEmail(email, token);

        res.json(saved);

    }catch (err: any){
        if (err.code === "23505"){
            return res.status(409).json({ message: "Email or username already exsist!"});
        }
        console.log(err);
        res.status(500).json({ message: "Registiration failed"});
    }

};


export const verifyEmail = async (req: Request, res: Response) => {

    const { token } = req.query;

    if (!token){
        return res.status(400).json({ message: "Token is required!"});
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email_verification_token: token as string});

    if (!user){
        return res.status(400).json({ message: "Invalid token!"});
    }

    if (user.email_verification_expires < new Date()){
        return res.status(400).json({ message: "Token has expired!"});
    }

    user.is_email_verified = true;
    user.email_verification_token = null as any;
    user.email_verification_expires = null as any;

    await userRepo.save(user);
    console.log("Email verified succesfully!");
    res.json({ message: "Email verified successfully!"});
};


export const changePassword = async (req: Request, res: Response) => {

    const { email } = req.body;

    if (!email){
        return res.status(400).json({ message: "Email is required!"})
    }

    try{

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ email: email });

        if (!user){
            return res.status(400).json({ message: "Invalid email address!"});
        }

        if (!user.is_email_verified){
            return res.status(400).json({ message: "You should validate your email address first!"});
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 24*60*60*1000);

        user.password_reset_token = token,
        user.password_reset_expires = expires

        console.log("PASS TOKEN: ", token); // postman
        await userRepo.save(user);
        
        await sendResetPassword(email, token);
        res.json({ message: "Password resent email sent!"});

    }catch (err: any){
        console.log(err);
        res.status(500).json({ message: "Reset password failed." });
    }

};


export const savePassword = async (req: Request, res: Response) => {

    const { token } = req.query;
    const { new_password } = req.body;

    if (!token || !new_password){
        return res.status(400).json({ message: "Token and new password is required!"});
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ password_reset_token: token as string});
    
    if (!user){
        return res.status(400).json({ message: "Invalid token!"});
    }
    
    if (user.password_reset_expires < new Date()){
        return res.status(400).json({ message: "Token has expired!"});
    }
    
    const hashed_pass = await bcrypt.hash(new_password as string, 10);
    
    user.password = hashed_pass;
    user.password_reset_expires = null as any;
    user.password_reset_token = null as any;

    await userRepo.save(user);
    console.log("Password successfully changed!");
    res.json({ message: "Password successfully changed!"});

};


export const googleCallback = async (req: Request, res: Response) => {

    const user = req.user as User;

    if (!user){
        return res.status(401).json({ message: "Google authentication failed."});
    }

    const token = signToken(user);

    res.status(200).json({
        success: true,
        message: "Login successfull",
        token,
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            profile_photo: user.profile_photo,
        },
    });

};


export const getInfos = async (req: Request, res: Response) => {

    const viewerId = req.userId;
    const targetId = Number(req.params.id);
    
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({id: Number(targetId)});

    if (!user){
        return res.status(404).json({message: "User not found!"});
    }

    if (viewerId === targetId){ // owner

        const response = {

            name: user.name,
            surname: user.surname,
            username: user.username,
            profile_photo: user.profile_photo,
            birth_date: user.birth_date

        };

        return res.status(200).json(response);


    }else{ // no friendship for now

        return res.status(404).json({ message: "no"});

    }


};


// user can create acc. without password via google or facebook
export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({message: "Email and password are required."});
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.createQueryBuilder("user").addSelect("user.password").where("user.email = :email", {email}).getOne();

    if (!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).json({message: "Invalid credentials!"});
    }

    if (!user.is_email_verified){
        return res.status(401).json({message: "Please verify your email first."});
    }

    const token = signToken(user);

    return res.status(200).json({ token });

};




export const getUsers = async (req: Request, res: Response) => {

    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();
    res.json(users);

};
