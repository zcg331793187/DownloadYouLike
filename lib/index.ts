// Save your local vars in .env for testing. DO NOT VERSION CONTROL `.env`!.
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').config();

import * as Koa from 'koa';
import * as chalk from 'chalk';
import {logger} from './configs';
import {router} from './routes';
import {middleware} from './middlewares';
import * as S from './services';
import { startWorker } from './workers';
let serve = require('koa-static');

const app = new Koa();


const port = process.env.PORT || 5555;

// 异步worker
startWorker();

S.startService();

app.use(middleware())
    .use(router().routes())
    .use(serve('.'));

app.listen(port, async () => {
    console.log(chalk.black.bgGreen.bold(`Listening on port ${port}`));
});

export default app;
