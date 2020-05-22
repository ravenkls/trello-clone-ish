import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeInsert,
  Unique,
} from "typeorm";
import bcrypt = require("bcryptjs")
import { Task } from "./Task.entity";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}
