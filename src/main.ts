/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
AppModule
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule);
        app.useGlobalPipes(new ValidationPipe({
            forbidUnknownValues: false
        }));
        app.use(cookieParser());
        app.enableCors({credentials:true,origin:process.env.CLIENT_URL});
        await app.listen(PORT, () => console.log(`Server  started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
};
start()