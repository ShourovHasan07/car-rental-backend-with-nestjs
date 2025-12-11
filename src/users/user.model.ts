import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

// ======= ADD THIS INTERFACE (IMPORTANT) ==========
export interface UserCreationAttributes
  extends Optional<
    User,
    'id' | 'password' | 'deletedAt' | 'createdAt' | 'updatedAt'
  > {}
// ===============================================

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
// IMPORTANT → Add UserCreationAttributes here
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare clerkId: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  })
  declare email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: '',
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare status: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare deletedAt: Date;
}
