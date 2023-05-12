import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostStatus, Prisma } from '@prisma/client';
import { CreateCommentDto } from './dto';
import { FilterPostDto } from './dto/filter.dto';

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) { }

    async getAllArticlesBy2() {
        return await this.prisma.post.findMany({});
    }
    async getAllArticles() {
        return await this.prisma.post.findMany({});
    }
    async getAllArticlesBy(filterPostDto: FilterPostDto) {
        const { keyword, category, tag, startDate, endDate, sort, order, page, limit } = filterPostDto;
        const where: Prisma.PostWhereInput = {};

        if (keyword) {
            where.OR = [
                { title: { contains: keyword } },
                { content: { contains: keyword } },
            ];
        }

        if (category) {
            where.categories = {
                some: {
                    id: { equals: category },
                },
            };
        }

        if (tag) {
            where.tags = {
                some: {
                    id: { equals: tag },
                },
            };
        }

        if (startDate && endDate) {
            where.createdAt = {
                gte: startDate,
                lte: endDate,
            };
        }

        const orderBy: Prisma.PostOrderByWithRelationInput = {};

        if (sort) {
            orderBy[sort] = order;
        }

        const skip = (page - 1) * limit;

        return await this.prisma.post.findMany({
            where,
            orderBy,
            skip,
            take: limit,
        });
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

