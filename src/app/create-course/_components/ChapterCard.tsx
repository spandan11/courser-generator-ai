"use client";

import {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import type { Dispatch, SetStateAction } from "react";
import { CrossCircledIcon, GearIcon } from "@radix-ui/react-icons";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import type { Chapter } from "@prisma/client";
import { toast } from "sonner";

interface Props {
  chapter: Chapter;
  chapterIndex: number;
  // completedChapters: Set<String>;
  // setcompletedChapters: Dispatch<SetStateAction<Set<String>>>;
  completedChapters: Set<string>;
  setCompletedChapters: Dispatch<SetStateAction<Set<string>>>;
}

export interface ChapterCardHandler {
  triggerLoad: () => void;
}

const ChapterCard = forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, setCompletedChapters }, ref) => {
    const {
      mutate: getChapterInfo,
      isLoading,
      isError,
    } = api.chapter.getChapter.useMutation();

    const addChapterIdToSet = useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter.videoId, addChapterIdToSet]);
    useImperativeHandle(ref, () => ({
      triggerLoad() {
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }
        getChapterInfo(
          { chapterId: chapter.id },
          {
            onSuccess: () => {
              setSuccess(true);
              addChapterIdToSet();
            },
            onError: () => {
              setSuccess(false);
              toast.error("Error generating chapter");
              addChapterIdToSet();
            },
          },
        );
      },
    }));
    const [success, setSuccess] = useState<boolean | null>(null);
    return (
      <div
        key={chapter.id}
        className={cn(
          "mt-2 flex items-center justify-between rounded px-4 py-2",
          {
            "bg-secondary": success === null,
            "bg-red-500": success === false,
            "bg-green-500": success === true,
          },
        )}
      >
        <h4>
          Chapter {chapterIndex + 1}: {chapter.name}
        </h4>
        {isLoading && <GearIcon className="animate-spin text-black" />}
        {isError && <CrossCircledIcon className="text-red-500" />}
      </div>
    );
  },
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
