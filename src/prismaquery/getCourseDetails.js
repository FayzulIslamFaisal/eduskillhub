import { prisma } from "@/lib/prisma";
export default async function getCourseDetails(id) {
    const course = await prisma.course.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            // subtitle: true,
            thumbnail: true,
            description: true,
            price: true,
            active: true,
            quizzes: true,
            testimonial: {
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                },
            },
            modules: {
                select: {
                     id: true,
                     title: true,
                     description: true,
                     status: true,
                     slug: true
                },
            },
            category: {
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    description: true
                },
            },
        }
    });
    return course;
}