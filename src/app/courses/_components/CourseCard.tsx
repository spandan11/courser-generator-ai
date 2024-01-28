import Link from "next/link";
import type { Chapter, Course, Unit } from "@prisma/client";
import Image from "next/image";

interface Props {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

const CourseCard = ({ course }: Props) => {
  return (
    <div className="rounded-lg border border-secondary">
      <div className="relative">
        <Link
          href={`/course/${course.id}/0/0`}
          className="relative block w-fit"
        >
          <Image
            alt="Course Image"
            src={course.image || ""}
            width={300}
            height={300}
            className="max-h-[300px] w-full rounded-t-lg object-cover"
          />
        </Link>
        <span className="absolute bottom-2 left-2 w-fit rounded-md bg-black/60 px-2 py-1 text-white">
          {course.name}
        </span>
      </div>
      <div className="p-4">
        <h4 className="text-sm text-secondary-foreground/60">Units</h4>
        <div className="space-y-1">
          {course.units.map((unit, unitIndex) => {
            return (
              <Link
                key={unit.id}
                href={`/course/${course.id}/${unitIndex}/0`}
                className="block w-fit underline"
              >
                Unit {unitIndex + 1} : {unit.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
