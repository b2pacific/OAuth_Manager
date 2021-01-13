import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User_Client } from "./user_client";

@Entity()
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryGeneratedColumn("uuid")
  client_id: string;

  @Column()
  client_secret: string;

  @Column()
  callback_url: string;

//   @OneToOne(() => User_Client, (user_client) => user_client.client)
//   oauth: User_Client;
}
