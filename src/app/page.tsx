"use client";

// import { unstable_noStore as noStore } from "next/cache";
// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";
// import { api } from "@/trpc/react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  // noStore();
  // const session =  getServerAuthSession();
  // const { data, error } = api.chapter.getChapter.useQuery({
  //   chapterId: "clrkujj7a0009492f0u01fmao",
  // });
  // console.log(data);
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <h1>Name: {session?.user.name}</h1>
      <h1>Email: {session?.user.email}</h1>
      <Image
        src={session?.user.image ?? ""}
        alt="avatar"
        width={100}
        height={100}
      />

      {/* {error && <p className="bg-red-500 text-white">Error: {error.message}</p>}

      <div className="border-2 bg-blue-500">
        {data ? (
          <pre className="border-2">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
      </div> */}
      {/* <div>
        {imgData ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
      </div> */}
    </div>
  );
}
