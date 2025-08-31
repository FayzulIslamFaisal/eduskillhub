import { prisma } from "@/lib/prisma";

export default async function getCourseDetailsByInstructor(instructorId) {
  const courses = await prisma.course.findMany({
    where: {
      instructorId: instructorId,
    },
    include: {
      _count: {
        select: { enrollments: true, testimonial: true },
      },
      testimonial: {
        select: {
          rating: true,
        },
      },
    },
  });

  // Summary বের করার জন্য reduce ব্যবহার করলাম
  let totalTestimonials = 0;
  let totalReviews = 0;
  let totalRating = 0;

  const formattedCourses = courses.map((course) => {
    const testimonialCount = course._count.testimonial;
    const averageRating =
      course.testimonial.length > 0
        ? course.testimonial.reduce((sum, t) => sum + t.rating, 0) /
          course.testimonial.length
        : 0;

    // summary হিসাব জমা করছি
    totalTestimonials += testimonialCount;
    totalReviews += course.testimonial.length;
    totalRating += course.testimonial.reduce((sum, t) => sum + t.rating, 0);

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      totalEnrollments: course._count.enrollments,
      testimonialCount,
      averageRating,
    };
  });

  // overall average বের করা
  const overallAverageRating =
    totalReviews > 0 ? totalRating / totalReviews : 0;

  return {
    courses: formattedCourses,
    totalCourses: courses.length,
    totalTestimonials,
    totalReviews,
    overallAverageRating,
  };
}
