import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Unique,
  Column,
  ManyToMany,
} from "typeorm";
import { User } from "../Users/User-entity";

@Entity()
@Unique(["teamname"])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamname: string;

  @ManyToMany((type) => User, (user) => user.teams)
  users: User[];
}
