import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../Users/User.entity";
import { TaskStatus } from "./TaskStatus.enum";
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;
}
