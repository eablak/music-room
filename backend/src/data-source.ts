// connect to db

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Friendship } from "./entities/Friendship";

export const AppDataSource = new DataSource({

    type: "postgres",
    url: process.env.DATABASE_URL ?? `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.DB_PORT ?? "5432"}/${process.env.POSTGRES_DB}`,
    synchronize: true,
    entities: [User, Friendship]

});