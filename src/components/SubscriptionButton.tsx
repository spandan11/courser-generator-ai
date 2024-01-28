"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

interface Props {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: Props) => {
  const [isloading, setisLoading] = useState(false);
  const { data } = api.stripe.getStripeStatus.useQuery();
  const handleSubscription = () => {
    setisLoading(true);
    window.location.href = data?.url ?? "";
    if (!data?.url) {
      console.log("Invalid or missing URL in data");
      setisLoading(false);
    }
  };
  return (
    <Button
      className={`mt-4 ${isloading ? "animate-pulse bg-foreground/60" : ""}`}
      disabled={isloading}
      onClick={handleSubscription}
    >
      {isPro ? "Manage subscription" : "Upgrade"}
    </Button>
  );
};

export default SubscriptionButton;
