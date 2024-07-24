import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

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
}