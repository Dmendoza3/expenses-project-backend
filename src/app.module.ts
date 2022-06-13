import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesController } from './controllers/expenses/expenses/expenses.controller';

@Module({
  imports: [],
  controllers: [AppController, ExpensesController],
  providers: [AppService],
})
export class AppModule {}
