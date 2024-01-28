import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY! as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL!}${path}`;
  return `http://localhost:${process.env.PORT! ?? 3000}${path}`;
}
