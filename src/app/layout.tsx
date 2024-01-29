import "@/styles/globals.css";

import { Poppins } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import Navbar from "@/app/_components/Navbar";
import SessionProvider from "@/lib/SessionProvider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AI course Generator",
  description: "AI Course Generator",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "min-h-screen antialiased")}>
        <MaxWidthWrapper>
          <SessionProvider>
            <Navbar />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </SessionProvider>
        </MaxWidthWrapper>
        <Toaster richColors expand={true} />
      </body>
    </html>
  );
}
