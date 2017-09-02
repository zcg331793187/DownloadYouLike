import * as log4js from 'log4js';
let appendars: [any] = [
    {
        type: 'file',
        filename: 'logs/application.log',
        maxLogSize: 1048 * 1048 * 16,
        numBackups: 10,
    },
    {
        type: 'logLevelFilter',
        appender: {
            type: 'file',
            filename: 'logs/error.log',
        },
        level: 'error',
        maxLogSize: 1048 * 1048,
        numBackups: 10,
    }];
if (!process.env || process.env.NODE_ENV !== 'production') {
    appendars.push({
        type: 'stdout',
    });
}
log4js.configure({
    appenders: [{
        type: 'clustered',
        appenders: appendars
    }]
});

export const logger = (tag: string = '') => log4js.getLogger(tag);
