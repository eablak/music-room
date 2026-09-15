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

    @Column({ nullable: true })
    email_verification_token!: string;

    @Column({ nullable: true, type: "timestamp" })
    email_verification_expires!: Date;

    @CreateDateColumn()
    created_date!: Date;

    @UpdateDateColumn()
    updated_date!: Date;

    @Column({ nullable: true })
    profile_photo!: string;

    @Column({ nullable: true })
    birth_date!: Date;

    @Column({ nullable: true })
    password_reset_token!: string;

    @Column({ nullable: true, type: "timestamp" })
    password_reset_expires!: Date;

    @Column({ nullable: true })
    google_id!: string;

    @Column({ default: "email "})
    auth_provider!: string;
}