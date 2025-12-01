import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FightersModule } from './fighters/fighters.module';
import { ReportsModule } from './reports/reports.module';
import { FightsModule } from './fights/fights.module';
import { EventsModule } from './events/events.module';
import { BonussesModule } from './bonusses/bonusses.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      }
    ) ,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: Number(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl:true
      }),
    }),
    UserModule,
    AuthModule,
    FightersModule,
    ReportsModule,
    FightsModule,
    EventsModule,
    BonussesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
