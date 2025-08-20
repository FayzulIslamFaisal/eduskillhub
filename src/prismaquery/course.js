import { prisma } from "@/lib/prisma";

const getCourses = async () => {
  const [courses, totalCount] = await prisma.$transaction([
    prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        title: true,
        thumbnail: true,
        description: true,
        price: true,
        active: true,
        quizzes: true,
      },
    }),

    prisma.course.count(), 
  ]);

  return { courses, totalCount };
};

export default getCourses;
