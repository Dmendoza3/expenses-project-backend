import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import * as mysql from 'mysql';


let conn = mysql.createConnection({
    connectionLimit: 10,
	host: 'sql5.freemysqlhosting.net', //process.env.DB_HOST,
	port: '3306', //process.env.DB_PORT,
	user: 'sql5499529',//process.env.DB_USER,
	password: 'RbBz8HzWYJ',//process.env.DB_PASS,
	database: 'sql5499529',//process.env.DB_SCHEMA,
	insecureAuth: true,
	multipleStatements: true
});

@Controller('categories')
export class CategoriesController {
    @Post()
    create(@Body() body: any, @Res() res: Response){
        let query = "insert into categories (name) values (?);";

        let values = [
            body.name
        ];

        conn.query(query, values, (err, result) => {
            if (err) 
                res.status(HttpStatus.BAD_REQUEST).send('Error while adding category...')
            else
                res.status(HttpStatus.CREATED).send('Category added');
        });
    }

    @Get()
    findAll(@Res() res: Response){
        let query = "select id, name from categories;";

        conn.query(query, (err, result) => {
            if (err) 
                res.status(HttpStatus.BAD_REQUEST).send('Error while getting categories...')
            else
                 res.status(HttpStatus.OK).json(result);
        });
    }
}
