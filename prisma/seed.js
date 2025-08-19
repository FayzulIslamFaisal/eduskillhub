import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  // Clear existing data (in correct order to respect foreign key constraints)
  await prisma.testimonial.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create users
  const users = [];
  for (let i = 0; i < 30; i++) {
    const role = i === 0 ? Role.ADMIN : 
                i < 10 ? Role.INSTRUCTOR : Role.USER;
    
    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number(),
        bio: faker.person.bio(),
        socialMedia: Array.from({ length: 3 }, () => faker.internet.url()),
        profilePicture: faker.image.avatar(),
        role,
      },
    });
    users.push(user);
    console.log(`Created user ${i + 1}/30`);
  }

  // Create categories
  const categories = [];
  const categoryTitles = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Music',
    'Health & Fitness',
    'Languages'
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
    console.log(`Created category ${i + 1}/10`);
  }

  // Create courses
  const courses = [];
  const instructors = users.filter(user => user.role === Role.INSTRUCTOR);

  for (let i = 0; i < 10; i++) {
    const course = await prisma.course.create({
      data: {
        title: faker.company.buzzVerb() + ' ' + faker.company.buzzNoun(),
        description: faker.lorem.paragraphs(3),
        thumbnail: faker.image.url(),
        active: faker.datatype.boolean(),
        price: faker.number.int({ min: 20, max: 200 }),
        instructorId: instructors[faker.number.int({ min: 0, max: instructors.length - 1 })].id,
        categoryId: categories[faker.number.int({ min: 0, max: categories.length - 1 })].id,
        quizzes: Array.from({ length: 3 }, () => faker.lorem.slug()),
      },
    });
    courses.push(course);
    console.log(`Created course ${i + 1}/10`);
  }

  // Create modules
  const modules = [];
  for (let i = 0; i < 10; i++) {
    const module = await prisma.module.create({
      data: {
        title: faker.company.buzzVerb() + ' ' + faker.company.buzzNoun(),
        description: faker.lorem.paragraph(),
        status: faker.datatype.boolean(),
        slug: faker.lorem.slug(),
        lessonIds: Array.from({ length: 5 }, () => faker.string.uuid()),
        courseId: courses[faker.number.int({ min: 0, max: courses.length - 1 })].id,
      },
    });
    modules.push(module);
    console.log(`Created module ${i + 1}/10`);
  }

  // Create testimonials
  for (let i = 0; i < 10; i++) {
    await prisma.testimonial.create({
      data: {
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        courseId: courses[faker.number.int({ min: 0, max: courses.length - 1 })].id,
      },
    });
    console.log(`Created testimonial ${i + 1}/10`);
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });