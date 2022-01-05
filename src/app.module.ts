import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      load: [configuration],
    }),
    MongooseModule.forRoot(`mongodb://${configuration().database.mongo.host}:` +
      `${configuration().database.mongo.port}/${configuration().database.mongo.database}`
    ,{ serverSelectionTimeoutMS: 5000 }),
    /* MongooseModule.forRoot(`mongodb://${configuration().database.mongo.username}:` +
      `${configuration().database.mongo.password}@${configuration().database.mongo.host}:` +
      `${configuration().database.mongo.port}/${configuration().database.mongo.database}` + 
      `?&authSource=admin`, { serverSelectionTimeoutMS: 5000, useFindAndModify: false }), */
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
