import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('/api')
  app.enableCors({
    origin: '*',
  })

  const config = new DocumentBuilder()
    .setTitle('Employee API')
    .setDescription('Employee APP API')
    .setVersion('1.0')
    .addTag('employee-management')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(3001);
}
bootstrap();
