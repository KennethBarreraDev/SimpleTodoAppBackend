// import winston from "winston";

// export class LoggerAdapter {
//     public static readonly options = {
//         file: {
//             level: 'info',
//             filename: `/logs/app.log`,
//             handleExceptions: true,
//             json: true,
//             maxsize: 5242880, // 5MB
//             maxFiles: 5,
//             colorize: false,
//         },
//         console: {
//             level: 'debug',
//             handleExceptions: true,
//             json: false,
//             colorize: true,
//         },
//     };
//     public static Logger: any
//     constructor() {
//         LoggerAdapter.Logger = new winston.Logger({
//             transports: [
//                 new winston.transports.File(LoggerAdapter.options.file),
//                 new winston.transports.Console(LoggerAdapter.options.console)
//             ],
//             exitOnError: false, // do not exit on handled exceptions
//         });
//     }

//     public static buildLogger(service: string){
//         return {
//             log: (message: string) => {
//                 LoggerAdapter.Logger.log('info', message, service,);
//             },
//             error: (message: string) => {
//                 LoggerAdapter.Logger.error('error', { message, service });
//             }
//         }
//     }

// }




