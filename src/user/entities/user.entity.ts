import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Friend } from "../../friend/entities/friend.entity";
import {Message} from "../../message/entities/message.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ type: 'smallint', default: 0 })
    gender: number;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ default: false })
    isPhoneNumberVerified: boolean;

    @Column({ nullable: true })
    referralCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[];

    @OneToMany(() => Friend, (friend) => friend.friend)
    friendOf: Friend[];

    @OneToMany(() => Message, (message) => message.createdBy)
    @JoinColumn()
    messages: Message[];
}