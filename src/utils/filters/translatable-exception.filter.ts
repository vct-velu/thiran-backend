import type { ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import type { TranslateOptions } from 'nestjs-i18n';
import { I18nContext } from 'nestjs-i18n';

export interface ExceptionResponseBodyType {
  statusCode?: number;
  message: string;
  error?: string;
  translationArgs?: TranslateOptions;
}

interface ResponseBodyType {
  statusCode?: number;
  message: string;
  error?: string;
  translatedMessage?: string;
}

@Catch(HttpException)
export class TranslatableExceptionFilter extends BaseExceptionFilter {
  private logger = new Logger(TranslatableExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.warn('An exception is thrown as a response: ', exception.stack);

    const i18n = I18nContext.current(host);
    const ctx = host.switchToHttp();
    const exceptionResponseBody =
      exception.getResponse() as ExceptionResponseBodyType;

    const translateOptions: TranslateOptions = {};

    if (exceptionResponseBody.translationArgs) {
      translateOptions.args = exceptionResponseBody.translationArgs;
      delete exceptionResponseBody.translationArgs;
    }

    const responseBody: ResponseBodyType = {
      ...exceptionResponseBody,
      message: i18n.t(exception.message, translateOptions),
    };

    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      exception.getStatus(),
    );
  }
}
