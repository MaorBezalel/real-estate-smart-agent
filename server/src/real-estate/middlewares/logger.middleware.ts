import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = req;

        const userAgent = req.get('user-agent') || '';

        res.on('finish', () => {
            const { statusCode } = res;
            const log = `
            Method: ${method}
            Status Code: ${statusCode}
            URL: ${originalUrl}
            IP Address: ${req.ips.length > 0 ? req.ips[0] : ip}
            User Agent: ${userAgent}\n`

            if (statusCode >= 400) {
                this.logger.error(log);
            } else {
                this.logger.log(log);
            }
        });

        next();
    }
}