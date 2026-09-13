import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true, nullable: true })
    email!: string;

    @Column({ nullable: true, select: false })
    password!: string;

    @Column({ default: false })
    is_email_verified!: boolean;

    @CreateDateColumn()
    created_date!: Date;

    @UpdateDateColumn()
    updated_date!: Date;

    @Column({ nullable: true })
    profile_photo!: string;

    @Column({ nullable: true })
    birth_date!: Date;

}