// connect to db

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Friendship } from "./entities/Friendship";

export const AppDataSource = new DataSource({

    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [User, Friendship]

});