import { InfoCircledIcon } from "@radix-ui/react-icons";

import CreateCourseForm from "./_components/CreateCourseForm";
import { checkSubscription } from "@/lib/subscription";

const CreateCourse = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="flex flex-col items-start py-8 sm:items-center">
      <h1 className="self-center text-3xl font-bold sm:text-5xl">
        Generate customized ai course
      </h1>
      <div className="mt-5 flex rounded-md border-none bg-secondary p-4">
        <InfoCircledIcon className="mr-3 h-12 w-12 text-blue-400" />
        <p>
          Enter in a course title or want you want to learn about. Then enter a
          list of units, which are thespecifes you want to learn . AI will
          generate a customized course for you.
        </p>
      </div>
      <CreateCourseForm isPro={isPro} />
    </div>
  );
};

export default CreateCourse;
