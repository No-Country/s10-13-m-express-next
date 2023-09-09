import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { CreateStripeIntentDto } from './dto/stripe-intent.dto';

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
      const paymentUserId = paymentEventMetadata.metadata.userId
      const paymentAmount = paymentEventMetadata.amount / 100
      const paymentInitiativeId = paymentEventMetadata.metadata.initiativeId
      console.log('Se ha recibido una donacion sastifactoria');
      console.log(
        `El usuario de id ${paymentUserId} dono el monto de ${paymentAmount} a la iniciativa ${paymentInitiativeId}`,
      );
      try {
        
      } catch (error) {
        
      }
    }
    return stripeEvent;
  }
}
