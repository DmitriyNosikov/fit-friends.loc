import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controlller';
import { BalanceService } from './balance.service';
import { BalanceFactory } from './balance.factory';
import { BalanceRepository } from './balance.repository';


@Module({
    imports: [],
    controllers: [BalanceController],
    providers: [BalanceService, BalanceFactory, BalanceRepository],
    exports: []
})
export class BalanceModule {}