import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const todoDatas = ['買い物に行く', '散歩に行く'];

const doSeed = async () => {
  const todos = [];
  for (const todo of todoDatas) {
    const createTodo = prisma.todo.create({ data: { title: todo } });
    todos.push(createTodo);
  }
  return await prisma.$transaction(todos);
};

const main = async () => {
  console.log('start seeding...');

  await doSeed();

  console.log('Seeding finished!!!');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
