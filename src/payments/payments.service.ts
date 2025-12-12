// src/modules/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Payment } from './payment.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid';

export interface InitiatePaymentResponse {
  paymentUrl: string;
  transactionId: string;
}

interface SSLCommerzResponse {
  GatewayPageURL: string;
  status?: string;
  failedreason?: string;
}

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
  ) {}

  async initiatePayment(
    amount: number,
    bookingId: number
  ): Promise<InitiatePaymentResponse> {
    const transactionId = uuid();

    // Save initial payment as pending
    await this.paymentModel.create({
      transactionId,
      amount,
      bookingId,
      status: 'pending',
      currency: 'BDT',
    });

    const payload = {
      store_id: process.env.SSL_STORE_ID,
      store_passwd: process.env.SSL_STORE_PASS,
      total_amount: amount,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/payments/success`,
      fail_url: `${process.env.BASE_URL}/payments/fail`,
      cancel_url: `${process.env.BASE_URL}/payments/cancel`,

    //   // Required Customer Info
    //   cus_name: "nayem",
    //   cus_email: "nayem@gmail.com",
    //   cus_add1: "Dhaka",
    //   cus_add2: "Dhaka",
    //   cus_city: "Dhaka",
    //   cus_state: "Dhaka",
    //   cus_postcode: "1000",
    //   cus_country: "Bangladesh",
    //   cus_phone: "01728619254",

      // Product Info
    //   product_name: "Car Rental",
    //   product_category: "Service",
    //   product_profile: "general",
    };

    try {
      const response = await axios.post<SSLCommerzResponse>(
        'https://sandbox.sslcommerz.com/gwprocess/v3/api.php',
        payload,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },// this header is very important for creat tranjaction 
          
        }
      );

      console.log('SSLCommerz response:', response.data);

      return {
        paymentUrl: response.data.GatewayPageURL || '',
        transactionId,
      };
    } catch (error: any) {
      console.error(
        'SSLCommerz API Error:',
        error.response?.data || error.message
      );
      return { paymentUrl: '', transactionId };
    }
  }

  async handleSuccess(data: any) {
    const { tran_id } = data;
    await this.paymentModel.update(
      { status: 'success' },
      { where: { transactionId: tran_id } }
    );
    return "Payment Success";
  }

  async handleFail(data: any) {
    const { tran_id } = data;
    await this.paymentModel.update(
      { status: 'failed' },
      { where: { transactionId: tran_id } }
    );
    return "Payment Failed";
  }

  async handleCancel(data: any) {
    const { tran_id } = data;
    await this.paymentModel.update(
      { status: 'cancelled' },
      { where: { transactionId: tran_id } }
    );
    return "Payment Cancelled";
  }
}
