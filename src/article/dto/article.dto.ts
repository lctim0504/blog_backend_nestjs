import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEnum, ArrayNotEmpty, ArrayMinSize, IsOptional, IsDate, IsNumber, IsEmail, isEmail } from 'class-validator';

enum PostStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsEnum(PostStatus)
    status: PostStatus;

    @IsNotEmpty()
    @Type(() => Number)
    authorId: number;

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    categoryIds: number[];

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    tagIds: number[];
}

export class UpdatePostDto {
    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsString()
    content?: string;

    @IsEnum(PostStatus)
    status?: PostStatus;

    @IsNotEmpty()
    authorId?: number;

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    categoryIds?: number[];

    @ArrayNotEmpty()
    @ArrayMinSize(1)
    tagIds?: number[];
}

export class DeletePostDto {
    @IsNotEmpty()
    id: number;
}

