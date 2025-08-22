import { prisma } from "@/lib/prisma";
export default async function GetEnrollmentForCourse(courseId) {
  const enrollments = await prisma.enrollment.findMany({
    where: {
        courseId: courseId,
    },
  });
  return {
    enrollments,
    length: enrollments.length,
  };
}
