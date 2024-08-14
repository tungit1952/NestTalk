import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Message} from "../../message/entities/message.entity";
import {User} from "../../user/entities/user.entity";

@Entity()
export class RoomChat {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    createdBy: User;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    recipient: User;

    @OneToMany(() => Message, (message) => message.roomChat, {
        cascade: ['insert', 'remove', 'update'],
    })
    messages: Message[];

    @OneToOne(() => Message)
    @JoinColumn({ name: 'lastMessage' })
    lastMessage: Message;

    @UpdateDateColumn()
    updatedAt: Date;
}
