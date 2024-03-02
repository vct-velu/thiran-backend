import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { I18nPath } from 'src/generated/i18n.generated';

import type { ExceptionResponseBodyType } from './filters/translatable-exception.filter';

function constructExceptionResponse(
  key: I18nPath,
  translationArgs?: Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalResponseData?: Record<string, any>,
): ExceptionResponseBodyType {
  const obj: ExceptionResponseBodyType = {
    message: key,
    ...(additionalResponseData || {}),
  };

  if (translationArgs) {
    obj.translationArgs = translationArgs;
  }

  return obj;
}

export class TranslatableBadRequestException extends BadRequestException {
  constructor(
    translationKey: I18nPath,
    translationArgs?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalResponseData?: Record<string, any>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseDataToSet: Record<string, any> = {
      statusCode: 400,
      ...additionalResponseData,
    };
    super(
      constructExceptionResponse(
        translationKey,
        translationArgs,
        responseDataToSet,
      ),
    );
  }
}

export class TranslatableNotFoundException extends NotFoundException {
  constructor(
    key: I18nPath,
    translationArgs?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalResponseData?: Record<string, any>,
  ) {
    super(
      constructExceptionResponse(key, translationArgs, additionalResponseData),
    );
  }
}

export class TranslatableUnauthorizedException extends UnauthorizedException {
  constructor(
    key: I18nPath,
    translationArgs?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalResponseData?: Record<string, any>,
  ) {
    super(
      constructExceptionResponse(key, translationArgs, additionalResponseData),
    );
  }
}

export class TranslatableUnprocessableEntityException extends UnprocessableEntityException {
  constructor(
    key: I18nPath,
    translationArgs?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalResponseData?: Record<string, any>,
  ) {
    super(
      constructExceptionResponse(key, translationArgs, additionalResponseData),
    );
  }
}

export class TranslatableForbiddenException extends ForbiddenException {
  constructor(
    key: I18nPath,
    translationArgs?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalResponseData?: Record<string, any>,
  ) {
    super(
      constructExceptionResponse(key, translationArgs, additionalResponseData),
    );
  }
}

export class TranslatableInternalServerErrorException extends InternalServerErrorException {
  constructor(
    key: I18nPath,
    translationArgs?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalResponseData?: Record<string, any>,
  ) {
    super(
      constructExceptionResponse(key, translationArgs, additionalResponseData),
    );
  }
}

export class TranslatableNotImplementedException extends NotImplementedException {
  constructor(
    key: I18nPath,
    translationArgs?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalResponseData?: Record<string, any>,
  ) {
    super(
      constructExceptionResponse(key, translationArgs, additionalResponseData),
    );
  }
}
