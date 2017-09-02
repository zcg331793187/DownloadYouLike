// 异步任务
const kue = require('kue');
export const queue = kue.createQueue();

import db from '../models';

export enum EWorkerStatus {
    start = null, success = 1, error = 2

}

const _workers: any[] = [];
// import { AddTrialWorker } from './add_trial_worker';
export const workers = _workers.reduce((hash: any, item) => {
    hash[item.name] = item;
    return hash;
}, {});
export function startWorker() {
    _workers.forEach(async (Worker: any) => {
        queue.process(Worker.name, 2, (job: any, done: any) => {
            let worker = new Worker(job);
            worker.log('begin worker ' + JSON.stringify(job.data));

            let workerObj = Object.assign({jobId: job.id}, job.data.worker);

            db.workers.create(workerObj).then((dbRes: any) => {
                worker.run().then((data: any) => {

                    worker.log('finished');
                    dbRes.status = EWorkerStatus.success;
                    dbRes.endAt = new Date();
                    if (data) {
                        dbRes.data = JSON.stringify(data);
                    }
                    dbRes.save().then(() => {
                        done();
                    }).catch(() => done());

                }).catch((err: any) => {
                    worker.log('finished by failure');
                    worker.log(err);
                    dbRes.status = EWorkerStatus.error;
                    dbRes.endAt = new Date();
                    if (err) {
                        dbRes.data = JSON.stringify(err);
                    }
                    dbRes.save().then(() => {
                        done();
                    }).catch(() => done());
                });
            });

        });
    });
}
