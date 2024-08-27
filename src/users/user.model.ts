import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ unique: true, allowNull: false })
  username: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phone: string;
}
