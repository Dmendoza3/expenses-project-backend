import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesController } from './controllers/expenses/expenses/expenses.controller';
import { CategoriesController } from './controllers/categories/categories/categories.controller';

@Module({
  imports: [],
  controllers: [AppController, ExpensesController, CategoriesController],
  providers: [AppService],
})
export class AppModule {}
