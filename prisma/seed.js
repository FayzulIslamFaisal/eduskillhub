import { PrismaClient, Role, EnrollmentMethod } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting seed process...');

  // ----------------- Clear DB -----------------
  await prisma.testimonial.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany(); // Added lesson deletion
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑 Database cleared successfully!');

  // ----------------- Users -----------------
  const users = [];
  for (let i = 0; i < 30; i++) {
    const role = i === 0 ? Role.ADMIN : i < 10 ? Role.INSTRUCTOR : Role.USER;
    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number(),
        bio: faker.lorem.paragraph(),
        socialMedia: Array.from({ length: 3 }, () => faker.internet.url()),
        profilePicture: faker.image.avatar(),
        role,
      },
    });
    users.push(user);
  }

  // ----------------- Categories -----------------
  const categories = [];
  const categoryTitles = [
    'Web Development', 'Data Science', 'Mobile Development', 'Design', 'Business',
    'Marketing', 'Photography', 'Music', 'Health & Fitness', 'Languages'
  ];
  for (let i = 0; i < 10; i++) {
    const category = await prisma.category.create({
      data: {
        title: categoryTitles[i],
        description: faker.lorem.paragraph(),
        thumbnail: faker.image.url(),
      },
    });
    categories.push(category);
  }

  // ----------------- Courses -----------------
  const courses = [];
  const instructors = users.filter(u => u.role === Role.INSTRUCTOR);
  for (let i = 0; i < 15; i++) {
    const course = await prisma.course.create({
      data: {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(3),
        thumbnail: faker.image.url(),
        active: faker.datatype.boolean(),
        price: faker.number.int({ min: 20, max: 200 }),
        subtitle: faker.company.catchPhrase(),
        learning: Array.from({ length: 4 }, () => faker.lorem.sentence()),
        duration: faker.number.int({ min: 30, max: 200 }),
        quizzes: Array.from({ length: 3 }, () => faker.lorem.slug()),
        instructorId: instructors[faker.number.int({ min: 0, max: instructors.length - 1 })].id,
        categoryId: categories[faker.number.int({ min: 0, max: categories.length - 1 })].id,
      },
    });
    courses.push(course);
  }

  // ----------------- Modules -----------------
  const modules = [];
  for (let i = 0; i < 30; i++) {
    const module = await prisma.module.create({
      data: {
        title: faker.company.name(),
        description: faker.lorem.paragraph(),
        status: faker.datatype.boolean(),
        slug: faker.lorem.slug(),
        courseId: courses[faker.number.int({ min: 0, max: courses.length - 1 })].id,
      },
    });
    modules.push(module);
  }

  // ----------------- Lessons -----------------
  for (let i = 0; i < 100; i++) {
    const module = modules[faker.number.int({ min: 0, max: modules.length - 1 })];
    
    await prisma.lesson.create({
      data: {
        title: faker.company.buzzPhrase(),
        description: faker.lorem.paragraph(),
        duration: faker.number.int({ min: 5, max: 60 }),
        video_Url: faker.internet.url(),
        published: faker.datatype.boolean(),
        slug: faker.lorem.slug(),
        access: faker.helpers.arrayElement(['FREE', 'PAID', 'PREMIUM']),
        moduleId: module.id,
      },
    });
  }

  // Update modules with lesson IDs
  const allLessons = await prisma.lesson.findMany();
  for (const module of modules) {
    const moduleLessons = allLessons.filter(lesson => lesson.moduleId === module.id);
    
    await prisma.module.update({
      where: { id: module.id },
      data: {
        lessonIds: moduleLessons.map(lesson => lesson.id),
      },
    });
  }

  // ----------------- Enrollments -----------------
  const students = users.filter(u => u.role === Role.USER);
  for (let i = 0; i < 40; i++) {
    await prisma.enrollment.create({
      data: {
        status: faker.datatype.boolean(),
        completion_date: faker.datatype.boolean() ? faker.date.recent({ days: 30 }) : null,
        enrollment_date: faker.date.recent({ days: 60 }),
        method: faker.helpers.arrayElement([
          EnrollmentMethod.CARD, EnrollmentMethod.BKASH, EnrollmentMethod.MANUAL, EnrollmentMethod.CASH
        ]),
        courseId: courses[faker.number.int({ min: 0, max: courses.length - 1 })].id,
        studentId: students[faker.number.int({ min: 0, max: students.length - 1 })].id,
      },
    });
  }

  // ----------------- Testimonials -----------------
  for (let i = 0; i < 20; i++) {
    await prisma.testimonial.create({
      data: {
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
        userId: students[faker.number.int({ min: 0, max: students.length - 1 })].id,
        courseId: courses[faker.number.int({ min: 0, max: courses.length - 1 })].id,
      },
    });
  }

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });