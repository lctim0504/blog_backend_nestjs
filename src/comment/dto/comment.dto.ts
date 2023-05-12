import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchCommentDto {

    @IsOptional()
    @Type(() => Number)
    authorId: number;

    @IsOptional()
    @Type(() => Number)
    postId: number;
}