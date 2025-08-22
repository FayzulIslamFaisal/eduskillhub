import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDB() {
  await prisma.testimonial.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑 Database cleared successfully!');
}

clearDB()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
