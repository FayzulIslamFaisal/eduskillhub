import { prisma } from "@/lib/prisma";

export default async function getCourseDetailsByInstructor(instructorId) {
  const courses = await prisma.course.findMany({
    where: {
      instructorId: instructorId,
    },
    include: {
      _count: {
        select: { enrollments: true }, // প্রতিটি course এর total enrollment count
      },
    },
  });

  return {
    courses: courses.map(course => ({
      ...course,
      totalEnrollments: course._count.enrollments,
    })),
    length: courses.length,
  };
}
