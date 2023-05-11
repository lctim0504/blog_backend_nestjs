import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    postId: number;

    @IsNotEmpty()
    authorId: number;
}
export class UpdateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;
}

export class DeleteCommentDto {
    @IsNotEmpty()
    id: number;
}
