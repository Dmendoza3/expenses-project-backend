"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesController = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql");
let conn = mysql.createConnection({
    connectionLimit: 10,
    host: 'sql5.freemysqlhosting.net',
    port: '3306',
    user: 'sql5499529',
    password: 'RbBz8HzWYJ',
    database: 'sql5499529',
    insecureAuth: true,
    multipleStatements: true
});
let ExpensesController = class ExpensesController {
    create(body, res) {
        let { category_id, name, value } = body;
        let query = "insert into expenses (category_id, name, value, registered_date) values (?, ?, ?, NOW());";
        let values = [
            category_id,
            name,
            value
        ];
        conn.query(query, values, (err, result) => {
            if (err) {
                console.log(err);
                res.status(common_1.HttpStatus.BAD_REQUEST).send('Error while adding expense...');
            }
            else
                res.status(common_1.HttpStatus.CREATED).send('Expense added');
        });
    }
    findAll(res) {
        let query = "select category_id, name, registered_date from expenses;";
        conn.query(query, (err, result) => {
            if (err)
                res.status(common_1.HttpStatus.BAD_REQUEST).send('Error while getting expenses...');
            else
                res.status(common_1.HttpStatus.OK).json(result);
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "findAll", null);
ExpensesController = __decorate([
    (0, common_1.Controller)('expenses')
], ExpensesController);
exports.ExpensesController = ExpensesController;
//# sourceMappingURL=expenses.controller.js.map