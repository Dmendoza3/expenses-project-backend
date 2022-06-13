import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
    @Post()
    create(@Body() body: any, @Res() res: Response){
        res.status(HttpStatus.CREATED).send('Category added added');
    }

    @Get()
    findAll(@Res() res: Response){
        
        res.status(HttpStatus.OK).json('List of all categories');
    }
}
