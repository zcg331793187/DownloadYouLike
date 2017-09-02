import {queue} from './';
import {logger} from '../configs';
export class BaseWorker {
    job: any;
    logger: any;

    async run(obj: any) {
        throw new Error('must overwrite this method');
    }

    constructor(job: any) {

        this.job = job;
        this.logger = logger(`worker/${this.getName()}#${job.data.tag}:${job.id}`);
    }

    log(msg: string, level = 'info') {
        this.logger[level](`${msg} ${(new Date()).toLocaleString()}`);
    }

    getName() {
        return this.constructor.name;
    }

    static performDelay(data: any, delay = 5000) {
        return queue.create(this.name, data)
            .delay(delay)
            .save();
    }

    static  performSync(data: any) {

        return new Promise((resolve, reject) => {
            let jod = queue.create(this.name, data)
                .save((err: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(jod);
                });
        });
    }
}
