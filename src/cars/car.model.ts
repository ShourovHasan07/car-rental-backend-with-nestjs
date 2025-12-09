import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'cars',
  timestamps: true,
})
export class Cars extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING(150))
  declare brand: string;

  @Column(DataType.STRING(150))
  declare model: string;

  @Column(DataType.STRING(150))
  declare year: string;

  @Column(DataType.STRING(150))
  declare dailyPrice: string;

  @Column(DataType.STRING(150))
  declare category: string;

  @Column(DataType.STRING(150))
  declare transmission: string;

  @Column(DataType.STRING(150))
  declare fuelType: string;

  @Column(DataType.STRING(150))
  declare seatingCapacity: string;

  @Column(DataType.STRING(150))
  declare location: string;

  @Column(DataType.STRING(250))
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isAvailable: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare carImage: string;
}
