// pages/api/webhook.ts
import type { Stripe } from 'stripe';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get('stripe-signature') as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`❌ Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  console.log(`✅ Webhook received: ${event.id}`);

  const permittedEvents: string[] = [
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      let data: any;

      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          console.log(`💰 CheckoutSession status: ${session.payment_status}`);

          data = {
            stripeCustomerId: session.customer,
            subscriptionId: session.subscription,
            plan: session.metadata?.plan_name || 'basic',
          };
          break;

        case 'customer.subscription.updated':
          const updatedSubscription = event.data.object as Stripe.Subscription;
          console.log(`🔄 Subscription updated: ${updatedSubscription.id}`);

          data = {
            stripeCustomerId: updatedSubscription.customer as string,
            subscriptionId: updatedSubscription.id,
            plan: updatedSubscription.items.data[0].plan.nickname || 'basic',
          };
          break;

        case 'customer.subscription.deleted':
          const deletedSubscription = event.data.object as Stripe.Subscription;
          console.log(`❌ Subscription deleted: ${deletedSubscription.id}`);

          data = {
            stripeCustomerId: deletedSubscription.customer as string,
            subscriptionId: null,
            plan: 'free',
          };
          break;

        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }

      console.log(data, 'data');
      // Send data to NestJS endpoint
      await fetch('http://localhost:3001/api/update-subscription', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`❌ Webhook handler failed: ${error}`);
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      );
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 });
}
