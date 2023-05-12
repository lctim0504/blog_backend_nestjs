import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostStatus } from '@prisma/client';
import { CreateCommentDto } from 'src/article/dto';
import { SearchCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) { }

    async getAllComments() {
        return await this.prisma.comment.findMany({});
    }
    async getCommentsById(id: number) {
        return await this.prisma.comment.findUnique({ where: { id } });
    }
    async getCommentsBy(findCommentDto: SearchCommentDto) {
        const { authorId, postId } = findCommentDto;
        return await this.prisma.comment.findMany({ where: { authorId, postId } });
    }
    async updateComment(id: number, dto: CreateCommentDto) {
        return await this.prisma.comment.update({
            where: { id },
            data: {
                content: dto.content,
            },
        });
    }
    async deleteComment(id: number) {
        return await this.prisma.comment.delete({
            where: { id }
        });
    }
}
