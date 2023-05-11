import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}