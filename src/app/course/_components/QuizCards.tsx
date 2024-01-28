"use client";

import { useCallback, useState } from "react";
import type { Chapter, Question } from "@prisma/client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  chapter: Chapter & {
    questions: Question[];
  };
}

const QuizCards = ({ chapter }: Props) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionState, setQuestionSate] = useState<
    Record<string, boolean | null>
  >({});
  console.log(answers);

  const checkAnswer = useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const user_answer = answers[question.id];
      if (!user_answer) return;
      if (user_answer == question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionSate(newQuestionState);
    });
  }, [answers, questionState, chapter.questions]);
  return (
    <div className="ml-8 mt-16 flex-[1]">
      <h1 className="text-2xl font-bold">Concept Check</h1>
      <div className="mt-2">
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <div
              key={question.id}
              className={cn("mt-4 rounded-lg border border-secondary p-3", {
                "bg-green-700": questionState[question.id] === true,
                "bg-red-700": questionState[question.id] === false,
                "bg-secondary": questionState[question.id] === null,
              })}
            >
              <h1 className="text-lg font-semibold"> {question.question}</h1>
              <div className="mt-2">
                <RadioGroup
                  onValueChange={(e) => {
                    setAnswers((prev) => {
                      return {
                        ...prev,
                        [question.id]: e,
                      };
                    });
                  }}
                >
                  {options.map((option, optionIndex) => {
                    return (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option}
                          id={question.id + optionIndex.toString()}
                        />
                        <Label htmlFor={question.id + optionIndex.toString()}>
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Button className="mt-2 w-full" size="lg" onClick={checkAnswer}>
          Check Answer
        </Button>
      </div>
    </div>
  );
};

export default QuizCards;
