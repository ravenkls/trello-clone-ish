import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeInsert,
  Unique,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import bcrypt = require("bcryptjs");
import { Task } from "../Tasks/Task.entity";
import { Team } from "../Teams/Team.entity";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany((type) => Team, (team) => team.users)
  @JoinTable()
  teams: Team[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}
