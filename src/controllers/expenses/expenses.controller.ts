import { Controller, Get, Post, Res, Req, HttpStatus, Body } from '@nestjs/common';
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
                res.status(HttpStatus.CREATED).send('Expense added successfully');
        });
    }

    @Get()
    findAll(@Req() req, @Res() res: Response){
        let { date } = req.query;

        let date_filter = (date) ? ' where registered_date = ?': '';
        let total_date_filter = (date) ? ' where month(registered_date) = month(?)': '';

        let values = [
            date, 
            date
        ];

        let query = "select " + 
        "expenses.name, concat('$ ', value) as value, DATE_FORMAT(registered_date, '%Y-%m-%d') as registered_date, categories.name as category from expenses " +
        "left join categories on categories.id=expenses.category_id" +
        date_filter + ";" +

        "select categories.id, categories.name as category, concat('$ ', cast(sum(expenses.value) as decimal(10, 2))) as total from expenses " + 
        "left join categories on categories.id=expenses.category_id " +
        total_date_filter + " group by categories.id, categories.name order by sum(expenses.value) desc;";

        console.log("date:", date)

        conn.query(query, values, (err, result) => {
            if (err) {
                res.status(HttpStatus.BAD_REQUEST).send('Error while getting expenses...');

                console.log(err)
            }else
                 res.status(HttpStatus.OK).json({
                    data: result[0],
                    data_sum: result[1],
                });
        });
    }
}
