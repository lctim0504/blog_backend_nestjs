import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    //取得分類列表
    @Get()
    getAllCategories() {
        return this.categoryService.getAllCategories();
    }
}
