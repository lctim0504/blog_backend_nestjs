import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { diskStorage } from 'multer';
import { extname } from 'path';
// import fs from 'fs';
import * as fs from 'fs-extra';
import { ImageService } from './image.service';

// Configuration 
cloudinary.config({
    cloud_name: "dje9cquas",
    api_key: "765814281277164",
    api_secret: "q6JR5x9RkASAy5xUHaXTvPmNnww"
});

const storage = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
    })

}

@Controller('articles/:postId/images')
export class ImageController {
    constructor(private imageService: ImageService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    async uploadImage(
        @Param('postId', ParseIntPipe) postId: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        // console.log(file);
        const result = await cloudinary.uploader.upload(file.path);
        // 在這裡你可以處理返回的結果，例如獲取圖片的公開 URL
        const imageUrl = result.secure_url;
        // 刪除臨時文件
        fs.unlinkSync(file.path);
        return this.imageService.uploadPostImage(postId, imageUrl);
    }
}
