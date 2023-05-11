const { PrismaClient, UserRole, PostStatus } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
    // 建立預設使用者
    try {
        const defaultUsers = [
            {
                email: 'user1@example.com',
                name: 'User 1',
                password: 'password1',
                role: UserRole.USER,
            },
            {
                email: 'user2@example.com',
                name: 'User 2',
                password: 'password2',
                role: UserRole.USER,
            },
        ];

        for (const user of defaultUsers) {
            await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    role: user.role,
                },
            });
        }
    } catch (error) { console.log(error); }

    // 建立預設分類
    try {
        const defaultCategories = [
            { name: '技術', slug: 'technology' },
            { name: '生活', slug: 'lifestyle' },
            { name: '旅遊', slug: 'travel' },
        ];

        for (const category of defaultCategories) {
            await prisma.category.create({
                data: {
                    name: category.name,
                    slug: category.slug,
                },
            });
        }
    } catch (error) { console.log(error); }

    // 建立預設標籤
    try {
        const defaultTags = [
            { name: 'JavaScript', slug: 'javascript' },
            { name: '前端開發', slug: 'frontend' },
            { name: '健康', slug: 'health' },
        ];

        for (const tag of defaultTags) {
            await prisma.tag.create({
                data: {
                    name: tag.name,
                    slug: tag.slug,
                },
            });
        }
    } catch (error) { console.log(error); }

    // 建立假文章
    try {
        const fakePosts = [
            {
                title: '範例文章 1',
                content: '這是範例文章 1 的內容。',
                authorId: 1, // 假設使用者 ID 為 1
                status: PostStatus.PUBLISHED,
                categoryIds: [1], // 假設分類 ID 為 1
                tagIds: [1, 2], // 假設標籤 ID 為 1 和 2
            },
            {
                title: '範例文章 2',
                content: '這是範例文章 2 的內容。',
                authorId: 2, // 假設使用者 ID 為 2
                status: PostStatus.PUBLISHED,
                categoryIds: [2], // 假設分類 ID 為 2
                tagIds: [2, 3], // 假設標籤 ID 為 2 和 3
            },
            {
                title: '範例文章 3',
                content: '這是範例文章 3 的內容。',
                authorId: 1, // 假設使用者 ID 為 1
                status: PostStatus.DRAFT,
                categoryIds: [1], // 假設分類 ID 為 1
                tagIds: [3], // 假設標籤 ID 為 3
            },
        ];

        for (const post of fakePosts) {
            await prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content,
                    status: post.status,
                    author: { connect: { id: post.authorId } },
                    categories: { connect: post.categoryIds.map((id) => ({ id })) },
                    tags: { connect: post.tagIds.map((id) => ({ id })) },
                },
            });
        }
    } catch (error) { console.log(error); }

    // 建立評論
    try {
        const fakeComments = [
            {
                content: '這篇文章寫得很棒！',
                postId: 1, // 假設文章 ID 為 1
                authorId: 1, // 假設使用者 ID 為 1
            },
            {
                content: '我喜歡這個主題，期待更多相關內容。',
                postId: 2, // 假設文章 ID 為 2
                authorId: 2, // 假設使用者 ID 為 2
            },
            {
                content: '這篇文章還有進一步改進的空間。',
                postId: 1, // 假設文章 ID 為 1
                authorId: 2, // 假設使用者 ID 為 2
            },
        ];

        for (const comment of fakeComments) {
            await prisma.comment.create({
                data: {
                    content: comment.content,
                    post: { connect: { id: comment.postId } },
                    author: { connect: { id: comment.authorId } },
                },
            });
        }
    } catch (error) { console.log(error); }

    console.log('Seed completed.');
}

seed()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
