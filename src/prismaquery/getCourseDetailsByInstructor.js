import { prisma } from "@/lib/prisma";
export default async function getCourseDetailsByInstructor(instructorId) {
  const courses = await prisma.course.findMany({
    where: {
      instructorId: instructorId,
    },
    });
  return {
    courses,
    length: courses.length
  };
}