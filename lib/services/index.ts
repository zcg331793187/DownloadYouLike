// 后端执行服务
import {SpiderService} from './spider_service';

export async function startService() {
    const spiderService: SpiderService = new SpiderService();
    if (process.env && process.env.NODE_ENV !== 'development') {
        await       spiderService.run();

    }
}
