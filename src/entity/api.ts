import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Request_Type {
    GET = "GET",
    POST = "POST"
}

enum Scope {
    BASIC = "basic",
    ADVANCE = "advance"
}

@Entity()
export class Api {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    tag: string;

    @Column()
    api_url: string;

    @Column({
        type: "enum",
        enum: Request_Type
    })
    request_type: Request_Type;

    @Column({
        type: "enum",
        enum: Scope
    })
    scope: Scope;
}