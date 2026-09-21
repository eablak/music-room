import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Friendship{

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, {onDelete: "CASCADE"})
    sender!: User;

    @ManyToOne(() => User, {onDelete: "CASCADE"})
    receiver!: User;

    @Column({default: "pending"})
    status!: "pending" | "accepted";

    @CreateDateColumn()
    created_date!: Date;

}