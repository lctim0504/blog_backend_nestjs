import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/article.dto';
import { PostStatus } from '@prisma/client';
import { CreateCommentDto } from './dto';

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) { }

    async getAllArticles() {
        return await this.prisma.post.findMany({});
    }
    async getSingleArticle(id: number) {
        return await this.prisma.post.findUnique({ where: { id } });
    }
    async createArticle(dto: any) {
        return await this.prisma.post.create({
            data: {
                title: dto.title,
                content: dto.content,
                authorId: dto.authorId,
                status: PostStatus.PUBLISHED,
                categories: { connect: dto.categoryIds.map((id) => ({ id })) },
                tags: { connect: dto.tagIds.map((id) => ({ id })) },
            }
        });
    }
    async updateArticle(id: number, dto: any) {
        return await this.prisma.post.update({
            where: { id },
            data: {
                title: dto.title,
                content: dto.content,
                authorId: dto.authorId,
                status: PostStatus.PUBLISHED,
                categories: { connect: dto.categoryIds.map((id) => ({ id })) },
                tags: { connect: dto.tagIds.map((id) => ({ id })) },
            }
        });
    }
    async deleteArticle(id: number) {
        return await this.prisma.post.delete({
            where: { id }
        });
    }
    async getArticleComments(id: number) {
        return await this.prisma.comment.findMany({
            where: { postId: id }, // 使用 where 選項指定要檢索的文章 ID
            include: { author: true }, // 關聯的作者資訊也一併檢索
        });
    }
    async createArticleComments(id: number, dto: CreateCommentDto) {
        return await this.prisma.comment.create({
            data: {
                content: dto.content,
                postId: id,
                authorId: dto.authorId,
            },
        });
    }
}

