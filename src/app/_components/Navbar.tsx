import Link from "next/link";

import UserAvatar from "@/app/_components/UserAvatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b-2 py-4">
      <h1 className="text-4xl font-semibold">
        CG <span className="text-sm text-black">ai</span>{" "}
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/create-course">Create Course</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/courses">Course Gallery</Link>
        </Button>
      </div>
      <UserAvatar />
    </div>
  );
};

export default Navbar;
