// src/modules/payments/payment.model.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PaymentCreationAttributes {
  transactionId: string;
  amount: number;
  bookingId: number;
  status: string;
  currency?: string;
}

@Table({
  tableName: 'payments',
  timestamps: true,
})
export class Payment extends Model<Payment, PaymentCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transactionId!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  currency?: string;
}
