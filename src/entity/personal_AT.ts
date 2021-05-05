import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Scope from "../enums/scope";
import { User } from "./user";

@Entity()
export class Personal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.personal_AT)
  user: User;

  @Column()
  access_token: string;

  @Column({
    type: "enum",
    enum: Scope,
    default: Scope.BASIC,
  })
  scope: Scope;

  @Column({ type: "simple-array", nullable: true })
  allowed_url: string[];

}
