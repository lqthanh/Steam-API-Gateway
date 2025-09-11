import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { L4d2ServerConfigModule } from './modules/l4d2-server-config/l4d2-server-config.module';
import { SteamCommunityModule } from './modules/steam-community/steam-community.module';
import { SteamStoreModule } from './modules/steam-store/steam-store.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Steam API Gateway')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Enable CORS
  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    credentials: false,
    methods: "*",
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
