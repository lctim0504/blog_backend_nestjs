import { Param, Body, Controller, Get, Post, Delete, ParseIntPipe, NotFoundException, Query, BadRequestException, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/article/dto';
import { SearchCommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get()
    async getCommentsBy(
        @Query() findCommentDto: SearchCommentDto
    ) {
        const comments = await this.commentService.getCommentsBy(findCommentDto);

        if (!comments || comments.length === 0) {
            throw new NotFoundException('查無評論');
        }

        return comments;
    }

    //取得評論列表
    @Get()
    getAllComments() {
        return this.commentService.getAllComments();
    }
    //取得指定 ID 的評論
    @Get(':id')
    async getCommentsById(@Param('id', ParseIntPipe) id: number) {
        const comment = await this.commentService.getCommentsById(id);
        if (!comment) throw new NotFoundException('評論不存在');

        return comment;
    }

    //修改指定 ID 的評論
    @Post(':id')
    async updateComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateCommentDto
    ) {
        const comment = await this.commentService.getCommentsById(id);
        if (!comment) throw new NotFoundException('評論不存在');

        return this.commentService.updateComment(id, dto);
    }
    //刪除指定 ID 的評論
    @Delete(':id')
    async deleteComment(@Param('id', ParseIntPipe) id: number) {
        const comment = await this.commentService.getCommentsById(id);
        if (!comment) throw new NotFoundException('評論不存在');

        return this.commentService.deleteComment(id);
    }

}
