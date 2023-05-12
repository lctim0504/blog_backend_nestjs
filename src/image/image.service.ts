import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {
    constructor(private prisma: PrismaService) { }

    async uploadPostImage(postId: number, imageUrl: string) {
        return await this.prisma.postImage.create({
            data: {
                postId: postId,
                imageUrl: imageUrl
            }
        });
    }
}
