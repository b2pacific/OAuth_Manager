import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_Client } from "./user_client";
import {Personal} from "./personal_AT";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @OneToMany(() => Personal, personal => personal.user)
    personal_AT: Personal[];

    // @OneToOne(() => User_Client, user_client => user_client.user)
    // oauth: User_Client;
}