import { checkSubscription } from "@/lib/subscription";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession();
  const isPro = await checkSubscription();

  if (!session) {
    return (
      <h2 className="mt-36 flex items-center justify-center text-lg text-gray-600">
        You are not logged in!
      </h2>
    );
  }
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <h2 className="mt-20 text-3xl font-semibold">
        Hi!, {session?.user.name?.split(" ")[0]}
      </h2>
      {isPro && (
        <span className="relative -right-20 top-12 rounded-lg bg-green-400 p-1 text-xs text-white">
          Pro
        </span>
      )}

      <Image
        className="my-4 rounded-full border-8 border-gray-200"
        alt="Profile"
        src={
          session?.user.image ??
          "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWluaW9uc3xlbnwwfHwwfHx8MA%3D%3D"
        }
        width={200}
        height={200}
        quality={100}
        priority
      />
      <h4 className="font-2xl py-2">{session?.user.email}</h4>
      {isPro && (
        <h4 className="font-2xl">
          Credits Remained:{" "}
          <span className="font-bold">{session?.user.credits}/10</span>
        </h4>
      )}
    </div>
  );
}
