import { z } from "zod";

import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { strict_output } from "@/lib/gpt";

export const chapterRouter = createTRPCRouter({
  getChapter: protectedProcedure
    .input(z.object({ chapterId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const chapter = await ctx.db.chapter.findUnique({
        where: {
          id: input.chapterId,
        },
      });

      if (!chapter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chapter not found",
        });
      }

      const videoId: string = await searchYoutube(chapter?.youtubeSearchQuery);
      let transcript = await getTranscript(videoId);
      const maxLength = 500;
      transcript = transcript.split(" ").slice(0, maxLength).join(" ");

      const summary: { summary: string } = await strict_output(
        "You are an AI capable of sumarizing a youtube transcript",
        "summarize in 250 words or less and do not talk about the sponsers or anything unrelated to the main topic, also do not introduce what the summary is about. it should be like teaching someone not reading youtube transcript \n" +
          transcript,
        {
          summary: "summary of the transcript",
        },
      );

      await ctx.db.chapter.update({
        where: {
          id: input.chapterId,
        },
        data: {
          videoId: videoId,
          summary: summary.summary,
        },
      });

      const questions = await getQuestionsFromTranscript(
        transcript,
        chapter.name,
      );

      await ctx.db.question.createMany({
        data: questions.map((question) => {
          const options = [
            ,
            question.answer,
            question.option1,
            question.option2,
            question.option3,
          ];
          return {
            question: question.question,
            answer: question.answer,
            options: JSON.stringify(options),
            chapterId: input.chapterId,
          };
        }),
      });

      return { success: true };
    }),
});
