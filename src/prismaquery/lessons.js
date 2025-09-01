import { prisma } from "@/lib/prisma";
export async function getLesson(lessonId) {
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
    });
    return lesson;
}