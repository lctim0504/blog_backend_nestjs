import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEnum, ArrayNotEmpty, ArrayMinSize, IsOptional, IsDate, IsNumber, IsEmail, isEmail, IsInt, Min } from 'class-validator';

enum OrderBy {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class FilterPostDto {

    //排序 
    @IsOptional()
    @IsOptional()
    sort: string;

    @IsEnum(OrderBy)
    @IsOptional()
    order: OrderBy = OrderBy.DESC;

    //分頁
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @Min(1)
    @Type(() => Number)
    limit: number = 3;

    //篩選
    @IsOptional()
    keyword: string;

    @IsOptional()
    @Type(() => Number)
    category: number;

    @IsOptional()
    @Type(() => Number)
    tag: number;

    @IsDate()
    @IsOptional()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate: Date;
}
