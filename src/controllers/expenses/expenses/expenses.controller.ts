import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';

@Controller('expenses')
export class ExpensesController {

    @Post()
    create(@Body() insertPerson: any, @Res() res: Response){

        // let query = "insert into persons (name) values (?)";

        // let values = [
        //     insertPerson.name
        // ];

        // con.query(query, values, (err, result) => {
        //     if (err) 
        //         res.status(HttpStatus.BAD_REQUEST).send('Error while adding...')
        //     else
                 res.status(HttpStatus.CREATED).send('Person added');
        // });
    }

    @Get()
    findAll(@Res() res: Response){
        // let query = "select name from persons;";

        // con.query(query, (err, result) => {
        //     if (err) 
        //         res.status(HttpStatus.BAD_REQUEST).send('Error while getting...')
        //     else
        // });
        
        res.status(HttpStatus.OK).json(this.personService.findAll());
    }
}
