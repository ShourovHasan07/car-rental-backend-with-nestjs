import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'admins',
  timestamps: true,
})
export class Admin extends Model<Admin> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number; // <-- declare ব্যবহার করতে হবে

  @Column(DataType.STRING(150))
  name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'ADMIN',
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;
}
