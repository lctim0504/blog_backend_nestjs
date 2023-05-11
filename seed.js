import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 建立一個使用者
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: UserRole.ADMIN,
    },
  });

  // 建立一篇文章和評論
  const post1 = await prisma.post.create({
    data: {
      title: 'My First Blog Post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'PUBLISHED',
      authorId: user1.id,
      comments: {
        create: {
          content: 'Great post!',
          authorId: user1.id,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
