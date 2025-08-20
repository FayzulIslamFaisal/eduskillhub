import { prisma } from "@/lib/prisma";

const getCourses= async()=> {
  return await prisma.course.findMany();
}

export default getCourses