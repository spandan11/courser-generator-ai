"use client";

import { GearIcon, LockOpen2Icon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserAvatar = () => {
  const { data } = useSession();
  const router = useRouter();

  if (!data?.user.image || !data?.user) {
    return <Button onClick={() => signIn("google")}>SignIn</Button>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer rounded-full outline outline-2 outline-offset-2 outline-green-500"
      >
        <Avatar>
          <AvatarImage
            src={
              data?.user.image ||
              "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW9ufGVufDB8fDB8fHww"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="w-auto truncate">
          {data?.user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          Settings
          <DropdownMenuShortcut>
            <GearIcon className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Logout
          <DropdownMenuShortcut>
            <LockOpen2Icon className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
