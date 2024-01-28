import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { stripe } from "@/lib/stripe";

export const stripeRouter = createTRPCRouter({
  getStripeStatus: protectedProcedure.query(async ({ ctx }) => {
    // const billingUrl = absoluteUrl("/settings/billing");
    const settingsUrl = process.env.NEXTAUTH_URL + "/settings";
    const userSubscription = await ctx.db.userSubscription.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
    // * Cancelling at the billing portal
    // if (userSubscription && userSubscription?.stripeCustomerId) {
    // const stripeSession = await stripe.billingPortal.sessions.create({
    //   customer: userSubscription?.stripeCustomerId,
    //   return_url: settingsUrl,
    // });
    // return { url: stripeSession.url };
    // }
    // * User's First time subscribing
    if (!userSubscription) {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: ctx.session.user.email!,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Course generator AI Pro",
                description: "Unlimited course generation",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: ctx.session.user.id,
        },
      });

      return { url: stripeSession.url };
    }
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription?.stripeCustomerId,
      return_url: settingsUrl,
    });
    return { url: stripeSession.url };
  }),
});
