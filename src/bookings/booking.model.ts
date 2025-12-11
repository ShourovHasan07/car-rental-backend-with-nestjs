import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Cars } from '../cars/car.model';

// Interface for creating a booking
export interface BookingCreationAttributes {
  userId: number;
  carId: number;
  price: number;
  pickupLocation: string;
  returnLocation: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  status?: string; 
}

@Table({
  tableName: 'bookings',
  timestamps: true,
})
export class Booking extends Model<Booking, BookingCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @ForeignKey(() => Cars)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare carId: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare pickupLocation: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare returnLocation: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare endDate: Date;

  @Column({ type: DataType.STRING, defaultValue: 'active' })
  declare status: string;
}
