import {Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

export abstract class BaseMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.messages)
    createdBy: User
}