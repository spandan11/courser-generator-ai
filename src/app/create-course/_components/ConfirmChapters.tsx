"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Chapter, Course, Unit } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import ChapterCard from "./ChapterCard";
import type { ChapterCardHandler } from "./ChapterCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

const ConfirmChapters = ({ course }: Props) => {
  const router = useRouter();
  const [isloading, setIsloading] = useState<boolean>(false);
  const chapterRef: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      chapterRef[chapter.id] = useRef(null);
    });
  });
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(
    new Set(),
  );
  const totalChaptersCount = useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);
  return (
    <div className="mt-4 w-full">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setCompletedChapters={setCompletedChapters}
                    key={chapter.id}
                    ref={chapterRef[chapter.id]}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="my-4 flex items-center justify-center">
        {/* <Separator className="flex=[1]" /> */}
        <div className="mx-4 flex w-full items-center justify-end">
          <Button variant="secondary" onClick={() => router.back()}>
            <ChevronLeftIcon className="mr-2 h-4 w-4" strokeWidth={4} />
            Back
          </Button>
          {totalChaptersCount === completedChapters.size ? (
            <Button asChild>
              <Link
                href={`/course/${course.id}/0/0`}
                className="ml-4 font-semibold"
              >
                Save & Continue
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              type="button"
              className="ml-4 font-semibold"
              disabled={isloading}
              onClick={() => {
                setIsloading(true);
                Object.values(chapterRef).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              Generate
              <ChevronRightIcon className="ml-2 h-4 w-4 " strokeWidth={4} />
            </Button>
          )}
        </div>
        {/* <Separator className="flex-[1]" /> */}
      </div>
    </div>
  );
};

export default ConfirmChapters;
