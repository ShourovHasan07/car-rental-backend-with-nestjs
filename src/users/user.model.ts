import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true, // for deletedAt
})
export class User extends Model<User> {
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

  @Column(DataType.STRING(100))
  declare phone: string;

  @Column(DataType.DATE)
  declare dob: Date;

  @Column(DataType.STRING(50))
  declare gender: string;

  @ForeignKey(() => User) // তুমি চাইলে Country model পরে বসাতে পারো
  @Column(DataType.INTEGER)
  declare countryId: number;

  @Column(DataType.STRING(100))
  declare city: string;

  @Column(DataType.STRING(100))
  declare whatsapp: string;

  @Column(DataType.STRING(255))
  declare password: string;

  @Column(DataType.STRING(255))
  declare image: string;

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
