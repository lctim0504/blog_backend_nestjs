import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) { }

    //取得標籤列表
    @Get()
    getAllTags() {
        return this.tagService.getAllTags();
    }
}
