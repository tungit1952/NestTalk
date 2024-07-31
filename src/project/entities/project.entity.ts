import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column()
    description:string

    @Column()
    key:string

    @Column()
    network:number

    @Column()
    status:number

    @Column({ nullable: true })
    avatar: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
