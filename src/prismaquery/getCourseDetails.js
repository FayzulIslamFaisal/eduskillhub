import { prisma } from "@/lib/prisma";
export default async function getCourseDetails(id) {
    const course = await prisma.course.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            subtitle: true,
            learning: true,
            thumbnail: true,
            description: true,
            price: true,
            active: true,
            quizzes: true,
            updatedAt: true,
            testimonial: {
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    user: {
                        select: {
                            id: true,
                            profilePicture: true,
                            firstName: true,
                            lastName: true
                        },
                    },
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
            instructor: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true,
                    bio: true,
                    profilePicture: true,
                    socialMedia: true,
                    designation:true
                },
            },
        }
    });
    return course;
}