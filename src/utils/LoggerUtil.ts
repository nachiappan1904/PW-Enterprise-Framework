import { timeStamp } from "console";
import moment from "moment-timezone";
import path from "path";
import winston, { createLogger, level, Logger, loggers, transports } from "winston";


const currentDir = __dirname;                                                                   //1. current directory - path for loggerutils file
const srcPath = path.resolve(currentDir,"..");                                                  //2. go back to root folder, src folder
const loggingDir = path.resolve(srcPath,"logging");                                             //3. goto logging folder

const customFormat = winston.format.printf(({level, message, timestamp})=>{                     //4. Function to format log entries with timestamp and timezone
    return `${timestamp} [${level}]: ${message}`;
});

const timeZone = "Asia/Kolkata";                                                                //5. set the desired timezone

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: ()=>moment().tz(timeZone).format()}), customFormat
    ),
    transports:[
     new winston.transports.Console({level:"debug"}),
     new winston.transports.File({
        filename: path.join(loggingDir, "test_run.log"),
        maxFiles: 5,
        maxsize: 10* 1024, //10kb
        level: "info",
     }),
     new winston.transports.File({
        filename: path.join(loggingDir,"test_error.log"),
        maxFiles: 5,
        maxsize: 10*1024,
        level: "error"
     }),
    ],
});

export default logger;