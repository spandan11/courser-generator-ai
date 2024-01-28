import { api } from "@/trpc/server";
import CourseCard from "./_components/CourseCard";

const Courses = async () => {
  const data = await api.course.getCourses.query();
  console.log(data);
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
