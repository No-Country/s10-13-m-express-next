import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { CreateStripeIntentDto } from './dto/stripe-intent.dto';
import { createDonation } from './interface/createDonation.interface';
import { isMongoId } from 'class-validator';

const stripeApiKey = process.env.STRIPE_SECRET_KEY;
const stripeCliKey = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(stripeApiKey, {
  apiVersion: '2023-08-16',
});

const successUrl = process.env.STRIPE_SUCCESS_URL;
const cancelUrl = process.env.STRIPE_CANCEL_URL;

@Injectable()
export class StripeService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaymentIntent(
    createStripeIntentDto: CreateStripeIntentDto,
  ): Promise<any> {
    const convertAmount = createStripeIntentDto.amount * 100; //El monto debe convertirse en centavos antes de enviarse a Stripe
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: createStripeIntentDto.userId },
      });
      if (!existingUser){
        throw new ConflictException('User ID no found');
      }
      console.log('estoy aqui')
      if(isMongoId(createStripeIntentDto.initiativeId)){
        const existingInitiative = await this.prisma.initiative.findUnique({
          where: {id: createStripeIntentDto.initiativeId}
        })
        if (!existingInitiative){
          throw new ConflictException('Initiative ID no found');
        }
      }else if (createStripeIntentDto.initiativeId != 'globalDonation'){
        throw new ConflictException('Initiative ID invalid');
      }

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            quantity: 1,
            price_data: {
              product_data: {
                name: 'donation',
              },
              currency: 'usd',
              unit_amount: convertAmount,
            },
          },
        ],
        mode: 'payment',
        success_url: `${successUrl}/donation`,
        cancel_url: `${cancelUrl}/donation`,
        payment_intent_data: {
          metadata: {
            // Add metadata with info about user and initiative
            userId: createStripeIntentDto.userId,
            initiativeId: createStripeIntentDto.initiativeId,
          },
        },
      });
      return session.url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async stripeWebHook(signature: string, payload: Buffer) {
    const stripeEvent: Stripe.Event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      stripeCliKey,
    );

    const paymentEventData: Stripe.Event.Data = stripeEvent.data;

    if (stripeEvent.type == 'payment_intent.succeeded') {
      const paymentEventMetadata: Stripe.PaymentIntent = paymentEventData.object as Stripe.PaymentIntent;
      const isGlobalDonation = paymentEventMetadata.metadata.initiativeId === 'globalDonation';
      const paymentObject: createDonation = {
        TransactionId: paymentEventMetadata.id,
        userId: paymentEventMetadata.metadata.userId,
        amount: paymentEventMetadata.amount / 100,
        initiativeID: paymentEventMetadata.metadata.initiativeId,
        isGlobalDonation
      }
      console.log(
        `El usuario de id ${paymentObject.userId} dono el monto de ${paymentObject.amount}$ a la iniciativa ${paymentObject.initiativeID}`,
      );
      try {
        await this.saveDonation(paymentObject)
      } catch (error) {
        throw error;
      }
    }
    return stripeEvent;
  }

  async saveDonation(createDonation : createDonation){
    try {
      if(createDonation.isGlobalDonation){
        const donation = await this.prisma.donation.create({
          data:{
            TransactionId: createDonation.TransactionId,
            amount: createDonation.amount,
            userId: createDonation.userId,
            isGlobalDonation: true
          }
        })
        console.log(donation)
      }else{
        const donation = await this.prisma.donation.create({
          data:{
            TransactionId: createDonation.TransactionId,
            amount: createDonation.amount,
            userId: createDonation.userId,
            initiativeID: createDonation.initiativeID
          }
        })
        console.log(donation)
      }
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
