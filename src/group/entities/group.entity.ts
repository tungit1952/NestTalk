import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    description: string;

    @Column()
    leader: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: 1 })
    status: number;

    @Column({nullable: true })
    createdBy: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({nullable: true })
    updatedBy: number;
}
