import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client";
import { User } from "./user";

enum Scope {
  BASIC = "basic",
  ADVANCE = "advance",
}

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
