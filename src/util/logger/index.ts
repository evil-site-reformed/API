import chalk from "chalk";
import { format, compareAsc } from 'date-fns';

export default class Logger {
    message: String;

    constructor(message: String) {
        this.message = message;
        
    }

    static info(message: String) {
        const date = new Date();
        const time = format(date, "pp");
        console.log(`${chalk.hex("#A6B1E1").bold("evil.bio >.<")} | ${chalk.hex("#18FF6D")(time)} | ${message}`);
    };

    static error(message: String, err?: Error) {
        const date = new Date();
        const time = format(date, "pp");
        console.log(`${chalk.hex("#A6B1E1").bold("evil.bio >.<")} | ${chalk.hex("#f5474a")(time)} | ${message}`);
    };

    static other(message: String) { 
        const date = new Date();
        const time = format(date, "pp");
        console.log(`${chalk.hex("#A6B1E1").bold("evil.bio >.<")} | ${chalk.hex("#fcd78d")(time)} | ${message}`);
    };
};