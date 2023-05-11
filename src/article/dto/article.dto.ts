import { IsNotEmpty, IsString, IsEnum, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

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

