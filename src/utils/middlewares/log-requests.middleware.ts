import type { NestMiddleware } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogRequestsMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  private counter = 0;

  private counterMod = 10_000;

  private formatMomentTime(time: Date) {
    return time.getTime() / 1000;
  }

  private formatRequestLogMessage(
    method: string,
    originalUrl: string,
    gotAtTime: Date,
    id: number,
  ) {
    const formattedTime = this.formatMomentTime(gotAtTime);

    return `[${formattedTime}] > {${id}} ${method} ${originalUrl}`;
  }

  private formatResponseLogMessage(
    method: string,
    originalUrl: string,
    respondedAtTime: Date,
    elapsedMs: number,
    statusCode: number,
    id: number,
  ) {
    const formattedTime = this.formatMomentTime(respondedAtTime);

    return `[${formattedTime}] < {${id}} ${method} ${originalUrl} => HTTP ${statusCode} (elapsed ${elapsedMs}ms)`;
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    const gotAtTime = new Date();
    const uuid = this.counter;

    this.counter = (this.counter + 1) % this.counterMod;

    const requestLogMessage = this.formatRequestLogMessage(
      method,
      originalUrl,
      gotAtTime,
      uuid,
    );
    this.logger.log(requestLogMessage);

    response.on('finish', () => {
      const { statusCode } = response;
      const respondedAtTime = new Date();
      const elapsed = respondedAtTime.getTime() - gotAtTime.getTime();

      const responseLogMessage = this.formatResponseLogMessage(
        method,
        originalUrl,
        respondedAtTime,
        elapsed,
        statusCode,
        uuid,
      );
      this.logger.log(responseLogMessage);
    });

    next();
  }
}
