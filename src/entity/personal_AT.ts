import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

enum Scope {
    BASIC = "basic",
    READ = "read",
    WRITE = "write",
    HYBD = "hybrid"
}

@Entity()
export class Personal {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.personal_AT)
    user: User;
    
    @Column()
    access_token: string;

    @Column({
        type: "enum",
        enum: Scope,
        default: Scope.BASIC
    })
    scope: Scope;

    @Column({
        type: "simple-array"
    })
    scopes: string[];
}