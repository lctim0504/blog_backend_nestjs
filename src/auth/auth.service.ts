import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }
    async signup(dto: AuthDto) {
        // password hash
        const hash = await argon.hash(dto.password);
        try {
            // save user data
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                }
            })
            // return user data
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            if (error && error.code === 'P2002') {
                throw new ForbiddenException('credentials taken');
            }
            throw error;
        }
    }
    async signin(dto: AuthDto) {
        //find user
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        //exist ? throw exception : compare password
        if (!user) throw new ForbiddenException('credentials incorrect')
        const passwordMatches = await argon.verify(user.password, dto.password);
        //correct ? throw exception : return user
        if (!passwordMatches) throw new ForbiddenException('credentials incorrect')
        return this.signToken(user.id, user.email);
    }
    async signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email: email
        }
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET_KEY')
        })
        return {
            access_token: token
        }
    }
}
