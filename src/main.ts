import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// (Optional) If you have a global exception filter, import it:
// import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Helmet for security
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.tailwindcss.com'],
          styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
          fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
          imgSrc: ["'self'", 'data:', '*.postgresql.org', 'nestjs.com'],
        },
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());



  // API versioning
  app.setGlobalPrefix('api/v1');

  // Swagger Documentation Configuration
  const config = new DocumentBuilder()
    .setTitle('vehicle nest API')
    .setDescription(
      `
# Vehicle Nest API

API documentation for Bookings, Testimonials, Users, Vehicle, and Vehicle Brand resources.

## Authentication

This API uses **JWT Bearer tokens** for secure authentication. All protected endpoints require proper authorization.

### Getting Started

1. **Login** using the \`POST /auth/signin\` endpoint
2. **Include the token** in your requests:   \`\`\`   Authorization: Bearer <your-access-token>   \`\`\`
3. **Refresh tokens** when needed using \`GET /auth/refresh\`

## Resources

- **Users**: User management
- **Bookings**: Booking management
- **Testimonials**: User testimonials
- **Vehicle**: Vehicle management
- **Vehicle Brand**: Vehicle brand management

## Usage

- **Base URL**: \`http://localhost:3000/api/v1\`
- **Documentation**: Available at \`/docs\`
- **Content-Type**: \`application/json\`
- **Authentication**: Bearer token in Authorization header
      `
    )
    .setVersion('1.0')
    .addTag('users', 'User management')
    .addTag('bookings', 'Booking management')
    .addTag('testimonials', 'User testimonials')
    .addTag('vehicle', 'Vehicle management')
    .addTag('vehicle-brand', 'Vehicle brand management')
    .addTag('auth', 'Authentication endpoints')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local Development Server')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      require('./bookings/bookings.module').BookingsModule,
      require('./testimonials/testimonials.module').TestimonialsModule,
      require('./users/users.module').UsersModule,
      require('./vehicle/vehicle.module').VehicleModule,
      require('./vehicle_brand/vehicle_brand.module').VehicleBrandModule,
      require('./auth/auth.module').AuthModule,
    ],
  });

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tryItOutEnabled: true,
    },
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info { margin-bottom: 20px; }
    `,
    customSiteTitle: 'Vehicle nest API Documentation',
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;

  await app.listen(PORT);
}
bootstrap();