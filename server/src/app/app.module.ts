import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, jwtConfig } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';
import { OrderModule } from './order/order.module';
import { BalanceModule } from './balance/balance.module';
import { TrainingReviewModule } from './training-review/training-review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      load: [appConfig, jwtConfig]
    }),

    UserModule,
    TrainingModule,
    TrainingReviewModule,
    OrderModule,
    BalanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
