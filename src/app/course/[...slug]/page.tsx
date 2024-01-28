import { redirect } from "next/navigation";
import { db } from "@/server/db";

import CourseSidebar from "../_components/CourseSidebar";
import MainVideoSummary from "../_components/MainVideoSummary";
import QuizCards from "../_components/QuizCards";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface Props {
  params: {
    slug: string[];
  };
}

const CoursePage = async ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });

  if (!course) {
    return redirect("/create-coure");
  }

  const unitIndex = parseInt(unitIndexParam!);
  const chapterIndex = parseInt(chapterIndexParam!);

  const unit = course.units[unitIndex];

  if (!unit) {
    return redirect(`/create-course/${courseId}`);
  }

  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/create-course");
  }

  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className="mt-8 flex">
      <CourseSidebar course={course} currentChapterId={chapter.id} />
      <div>
        <div className="ml-8">
          <div className="flex">
            <MainVideoSummary
              chapter={chapter}
              chapterIndex={chapterIndex}
              unit={unit}
              unitIndex={unitIndex}
            />
            <QuizCards chapter={chapter} />
          </div>
          <div className="mt-4 h-[1px] flex-[1] bg-gray-500 text-gray-500" />
          <div className="flex pb-8">
            {prevChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                className="mr-auto mt-4 flex w-fit"
              >
                <div className="flex items-center justify-center">
                  <ChevronLeftIcon className="mr-1 h-6 w-6" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Previous
                    </span>
                    <span className="text-sm font-bold">
                      {prevChapter.name}
                    </span>
                  </div>
                </div>
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                className="ml-auto mt-4 flex w-fit"
              >
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Previous
                    </span>
                    <span className="text-sm font-bold">
                      {nextChapter.name}
                    </span>
                  </div>
                  <ChevronRightIcon className="ml-1 h-6 w-6" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
