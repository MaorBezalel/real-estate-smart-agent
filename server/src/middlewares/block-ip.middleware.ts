import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BlockIpMiddleware implements NestMiddleware {
  private blockedIps = process.env.IPS_TO_BLOCK
    ? process.env.IPS_TO_BLOCK.split(',')
    : [];

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ips.length ? req.ips[0] : req.ip;

    if (this.blockedIps.includes(ip)) {
      throw new ForbiddenException('Access denied');
    }

    next();
  }
}
