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

@Controller('expenses')
export class ExpensesController {

    @Post()
    create(@Body() body: any, @Res() res: Response){
        let { category_id, name, value } = body;

        let query = "insert into expenses (category_id, name, value, registered_date) values (?, ?, ?, NOW());";

        let values = [
            category_id,
            name, 
            value
        ];

        conn.query(query, values, (err, result) => {
            if (err){
                console.log(err);
                res.status(HttpStatus.BAD_REQUEST).send('Error while adding expense...');
            }else
                res.status(HttpStatus.CREATED).send('Expense added');
        });
    }

    @Get()
    findAll(@Res() res: Response){
        let query = "select category_id, name, registered_date from expenses;";

        conn.query(query, (err, result) => {
            if (err) 
                res.status(HttpStatus.BAD_REQUEST).send('Error while getting expenses...')
            else
                 res.status(HttpStatus.OK).json(result);
        });
    }
}
