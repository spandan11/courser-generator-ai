import { InfoCircledIcon } from "@radix-ui/react-icons";

import CreateCourseForm from "./_components/CreateCourseForm";
import { checkSubscription } from "@/lib/subscription";
import { getServerAuthSession } from "@/server/auth";

const CreateCourse = async () => {
  const session = await getServerAuthSession();
  const isPro = await checkSubscription();

  if (!session) {
    return (
      <h2 className="mt-36 flex items-center justify-center text-lg text-gray-600">
        You are not logged in!
      </h2>
    );
  }
  return (
    <div className="flex flex-col items-start py-8 sm:items-center">
      <h1 className="self-center text-3xl font-bold sm:text-5xl">
        Generate customized ai course
      </h1>
      <div className="mt-5 flex rounded-md border-none bg-secondary p-4">
        <InfoCircledIcon className="mr-3 h-12 w-12 text-blue-400" />
        <p>
          Enter in a course title or what you want to learn about. Then enter a
          list of units, which are thespecifes you want to learn . AI will
          generate a customized course for you.
        </p>
      </div>
      <CreateCourseForm isPro={isPro} />
    </div>
  );
};

export default CreateCourse;
