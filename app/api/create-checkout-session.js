import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subscriptionId } = req.body;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      subscription: subscriptionId,
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/cancel`,
    });
    res.status(200).json({ sessionId: session.id });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
