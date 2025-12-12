// src/modules/payments/payments.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { PaymentsService, InitiatePaymentResponse } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  // Payment initiate করা
  @Post('initiate')
  async initiate(@Body() body: { amount: number; bookingId: number }): Promise<InitiatePaymentResponse> {
    return this.paymentsService.initiatePayment(body.amount, body.bookingId);
  }

  // Payment Success
  @Post('success')
  async success(@Req() req) {
    await this.paymentsService.handleSuccess(req.body);
    return { message: "Payment Success" };
  }

  // Payment Fail
  @Post('fail')
  async fail(@Req() req) {
    await this.paymentsService.handleFail(req.body);
    return { message: "Payment Failed" };
  }

  // Payment Cancel
  @Post('cancel')
  async cancel(@Req() req) {
    await this.paymentsService.handleCancel(req.body);
    return { message: "Payment Cancelled" };
  }
}
