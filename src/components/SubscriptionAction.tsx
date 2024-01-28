"use client";

import { useSession } from "next-auth/react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { api } from "@/trpc/react";

const SubscriptionAction = () => {
  const { data, isLoading } = api.stripe.getStripeStatus.useQuery();
  const handleSubscribe = () => {
    window.location.href = data?.url ?? "";
    if (!data?.url) {
      console.log("Invalid or missing URL in data");
    }
  };
  const { data: session } = useSession();
  return (
    <div className="mx-auto mt-4 flex w-1/2 flex-col items-center rounded-md bg-secondary p-4">
      {session?.user.credits} /10 Free Generations
      <Progress
        value={session?.user.credits ? (session?.user.credits / 10) * 100 : 0}
      />
      <Button
        onClick={handleSubscribe}
        disabled={isLoading}
        className="mt-3 bg-gradient-to-tr from-green-400 to-blue-500 font-bold text-white transition hover:from-green-500 hover:to-blue-600"
      >
        Upgrade
        <LightningBoltIcon className="ml-2 fill-white" />
      </Button>
    </div>
  );
};

export default SubscriptionAction;
