import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'is_notify_manager', default: false })
    isNotifyManager: boolean;

    @Column({ type: 'text', nullable: true })
    procedure: string;

    @Column({ name: 'is_advanced', default: false })
    isAdvanced: boolean;

    @Column({ name: 'category_id' })
    categoryId: number;

    @Column({ name: 'group_id' })
    groupId: number;

    @Column({ type: 'text', nullable: true })
    watcher: string;

    @Column({ type: 'text', nullable: true })
    approver: string;

    @Column({ type: 'int', nullable: true })
    sla: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: 1 })
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'created_by', nullable: true })
    createdBy: number;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: number;

    @Column({ name: 'form_template_id', nullable: true })
    formTemplateId: number;
}