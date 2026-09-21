import  jwt  from "jsonwebtoken";
import { User } from "../entities/User";

export const signToken = (user: User) => jwt.sign({ userId: user.id}, process.env.JWT_SECRET!, {expiresIn: "3h"});