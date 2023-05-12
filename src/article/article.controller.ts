import { Query, Param, Body, Controller, Get, Post, Delete, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateCommentDto, CreatePostDto } from './dto';
import { FilterPostDto } from './dto/filter.dto';



@Controller('articles')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    //取得文章列表
    @Get()
    getAllArticlesBy(
        @Query() filterPostDto: FilterPostDto,
    ) {
        return this.articleService.getAllArticlesBy(filterPostDto);
    }
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
