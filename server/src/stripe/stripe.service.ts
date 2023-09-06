import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { CreateStripeIntentDto } from './dto/stripe-intent.dto';

const stripeApiKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeApiKey, {
    apiVersion: '2023-08-16',
  });

@Injectable()
export class StripeService {
    constructor(private readonly prisma: PrismaService){}

    async createPaymentIntent(createStripeIntentDto: CreateStripeIntentDto): Promise<any>{
        const convertAmount = createStripeIntentDto.amount * 100 //El monto debe convertirse en centavos antes de enviarse a Stripe
        // const PaymentIntent = await stripe.paymentIntents.create({
        //     amount: convertAmount,
        //     currency: 'usd',
        //     automatic_payment_methods: {
        //         enabled: true,
        //     },
        //     metadata:{
        //         userId: createStripeIntentDto.userId, //Agrego una metadata con el user id para identificar quien esta haciendo el pago
        //         initiativeId: createStripeIntentDto.initiativeId 
        //     }
        // })
        try {
            
            const session = await stripe.checkout.sessions.create({
                line_items: [
                  { quantity:1,
                    price_data:{
                        product_data:{
                            name: 'donation',
                            metadata:{
                                userId: createStripeIntentDto.userId, //Agrego una metadata con el user id para identificar quien esta haciendo el pago
                                initiativeId: createStripeIntentDto.initiativeId 
                            },
                        },
                        currency: 'usd',
                        unit_amount: convertAmount,
                    }
                  },
                ],
                mode: 'payment',
                success_url: `https://www.domain.com/success.html`,
                cancel_url: `https://www.domain.com/cancel.html`,
              });
              console.log(session)
            return session.url
        } catch (error) {
            console.log(error)
        }
    }
}
