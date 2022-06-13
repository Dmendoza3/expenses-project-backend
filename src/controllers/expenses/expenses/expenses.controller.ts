import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';

@Controller('expenses')
export class ExpensesController {

    @Post()
    create(@Body() body: any, @Res() res: Response){

        res.status(HttpStatus.CREATED).send('Expense added');
    }

    @Get()
    findAll(@Res() res: Response){
        
        res.status(HttpStatus.OK).json('List of all expenses');
    }
}
