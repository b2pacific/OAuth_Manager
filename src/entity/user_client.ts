import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Scope from "../enums/scope";
import { Client } from "./client";
import { User } from "./user";

@Entity()
export class User_Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column()
  refresh_token: string;

  @Column()
  authorization_grant: string;

  @Column({ type: "simple-array", nullable: true })
  allowed_url: string[];

  @Column({
    type: "enum",
    enum: Scope,
    default: Scope.BASIC,
  })
  scope: Scope;
}
