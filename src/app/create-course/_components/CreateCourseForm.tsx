"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";

import { createChapterSchema } from "@/validators/course";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import SubscriptionAction from "@/components/SubscriptionAction";

interface Props {
  isPro: boolean;
}

type TCreateChapterSchema = z.infer<typeof createChapterSchema>;

const CreateCourseForm = ({ isPro }: Props) => {
  const router = useRouter();
  const {
    mutate: createCourse,
    data,
    isLoading,
  } = api.course.createCourse.useMutation({
    onSuccess: ({ courseId }) => {
      toast.dismiss();
      toast.success("Redirecting...");
      router.push(`/course/${courseId}`);
    },
    onError: (error) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });
  // const promise = () =>
  //   new Promise((resolve) =>
  //     setTimeout(
  //       () =>
  //         resolve({
  //           isSuccess,
  //         }),
  //       10000,
  //     ),
  //   );

  const form = useForm<TCreateChapterSchema>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });
  const onSubmit = (data: TCreateChapterSchema) => {
    if (data.units.some((unit) => unit === "")) {
      return toast.error("Please fill all fields");
    }
    createCourse({
      title: data.title,
      units: data.units,
    });

    toast.info("Processing your data");
    form.reset();
  };
  return (
    <div className="w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-lg">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter the title of course"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    control={form.control}
                    name={`units.${index}`}
                    render={({ field }) => (
                      <FormItem className="p-2">
                        <FormLabel className="text-lg">
                          Unit {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            {...field}
                            placeholder="Enter subtopic of the course"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div className="my-2 flex items-center justify-center">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit
                <PlusIcon className="ml-2 h-4 w-4 text-green-500" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="ml-2 font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units").slice(0, -1)]);
                }}
              >
                Remove Unit
                <TrashIcon className="ml-2 h-4 w-4 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-6 w-full"
            size="lg"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
          {data?.courseId}
        </form>
      </Form>
      {!isPro && <SubscriptionAction />}
    </div>
  );
};

export default CreateCourseForm;
