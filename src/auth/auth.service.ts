import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PublicUser } from 'src/types/user';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(validateUserDto:LoginDto) {
        const user = await this.userService.findByEmail(validateUserDto.email);
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        
        const isPasswordValid = await bcrypt.compare(validateUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const { password: _, ...userWithoutPass } = user;
        return userWithoutPass;
    }

    async login(user:PublicUser) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
