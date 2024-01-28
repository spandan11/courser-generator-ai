import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const checkSubscription = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return false;
  }
  const userSubscription = await db.userSubscription.findFirst({
    where: {
      userId: session.user.id,
    },
  });
  if (!userSubscription) {
    return false;
  }
  // if (
  //   userSubscription.stripePriceId &&
  //   userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }
  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd &&
    userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
