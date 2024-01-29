import { api } from "@/trpc/server";
import CourseCard from "./_components/CourseCard";
import { getServerAuthSession } from "@/server/auth";

const Courses = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <h2 className="mt-36 flex items-center justify-center text-lg text-gray-600">
        You are not logged in!
      </h2>
    );
  }
  const data = await api.course.getCourses.query();
  return (
    <div className="mx-auto max-w-7xl py-8">
      <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((course, courseIndex) => {
          return <CourseCard course={course} key={courseIndex} />;
        })}
      </div>
    </div>
  );
};

export default Courses;
