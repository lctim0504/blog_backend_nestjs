import { Param, Body, Controller, Get, Post, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/article/dto';

@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    //取得評論列表
    @Get()
    getAllComments() {
        return this.commentService.getAllComments();
    }
    //取得指定 ID 的評論
    @Get(':id')
    async getCommentsByPost(@Param('id', ParseIntPipe) id: number) {
        const comment = await this.commentService.getCommentsByPost(id);
        if (!comment) throw new NotFoundException('評論不存在');

        return comment;
    }
    //修改指定 ID 的評論
    @Post(':id')
    async updateComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateCommentDto
    ) {
        const comment = await this.commentService.getCommentsByPost(id);
        if (!comment) throw new NotFoundException('評論不存在');

        return this.commentService.updateComment(id, dto);
    }
    //刪除指定 ID 的評論
    @Delete(':id')
    async deleteComment(@Param('id', ParseIntPipe) id: number) {
        const comment = await this.commentService.getCommentsByPost(id);
        if (!comment) throw new NotFoundException('評論不存在');

        return this.commentService.deleteComment(id);
    }
}
