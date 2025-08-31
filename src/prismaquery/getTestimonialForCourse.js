import { prisma } from "@/lib/prisma";
export default async function getTestimonialForCourse(courseId) {
    const testimonials = await prisma.testimonial.findMany({
        where: {
            courseId: courseId,
        },
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
        }
    });
    return testimonials;
}
