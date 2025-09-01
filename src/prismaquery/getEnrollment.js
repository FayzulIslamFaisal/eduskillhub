import { prisma } from "@/lib/prisma";
export default async function GetEnrollmentForCourse(courseId) {
  const enrollments = await prisma.enrollment.findMany({
    where: {
        courseId: courseId,
    },
    select:{
        id: true,
        status: true,
        completion_date: true,
        enrollment_date: true,
        method: true,
        student: {
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profilePicture: true,
                phoneNumber: true,
                designation: true,
                socialMedia: true,
                role: true,
                bio: true,
            }
        },
        course: {
            select: {
                id: true,
                title: true,
                subtitle: true,
                thumbnail: true,
                price: true,
                duration: true,
                learning: true,
                active: true,
                quizzes: true,
            }
        }
    }
  });
  return {
    enrollments,
    length: enrollments.length,
  };
}
