import { redirect } from "next/navigation";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import { db } from "@/server/db";
import ConfirmChapters from "../_components/ConfirmChapters";

interface Props {
  params: { courseId: string };
}

const Course = async ({ params: { courseId } }: Props) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    redirect("/");
  }
  console.log(course.units);
  return (
    <div className="mx-auto my-16 flex  flex-col items-start">
      <h4 className="text-sm uppercase text-secondary-foreground/80">
        Course Name
      </h4>
      <h1 className="text-5xl font-bold">{course.name}</h1>
      <div className="mt-5 flex w-full rounded-md border-none bg-secondary p-4">
        <InfoCircledIcon className="mr-3 h-10 w-10 text-blue-400 " />
        <p className="flex items-center justify-center text-sm ">
          We generated chapters for each of your units. Look over them and click
          the Button to confirm and continue.
        </p>
      </div>
      <ConfirmChapters course={course} />
    </div>
  );
};

export default Course;
