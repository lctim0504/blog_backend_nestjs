import { Param, Body, Controller, Get, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreatePostDto } from './dto/article.dto';
import { CreateCommentDto } from './dto';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    //取得文章列表
    @Get()
    getAllArticles() {
        return this.articleService.getAllArticles();
    }
    //取得指定 ID 的文章
    @Get(':id')
    getSingleArticle(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.getSingleArticle(id);
    }
    //新增文章
    @Post()
    createArticle(@Body() dto: CreatePostDto) {
        return this.articleService.createArticle(dto);
    }
    //修改指定 ID 的文章
    @Post(':id')
    updateArticle(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreatePostDto
    ) {
        return this.articleService.updateArticle(id, dto);
    }
    //刪除指定 ID 的文章
    @Delete(':id')
    deleteArticle(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.deleteArticle(id);
    }
    //取得指定文章的評論列表
    @Get(':id/comments')
    async getArticleComments(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.getArticleComments(id);
    }
    //新增指定文章的評論
    @Post(':id/comments')
    async createArticleComments(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateCommentDto
    ) {
        return this.articleService.createArticleComments(id, dto);
    }
}
