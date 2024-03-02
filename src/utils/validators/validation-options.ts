import type { ValidationPipeOptions } from '@nestjs/common';
// import { HttpException, HttpStatus } from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  // exceptionFactory: (errors: ValidationError[]) => {
  //   function findConstraints(validationErrors: ValidationError[]) {
  //     if (!validationErrors[0].constraints) {
  //       if (!validationErrors[0].children) {
  //         return null;
  //       }

  //       return findConstraints(validationErrors[0].children);
  //     }

  //     return {
  //       constraints: validationErrors[0].constraints,
  //       property: validationErrors[0].property,
  //     };
  //   }

  //   const constraints: ValidationError = findConstraints(errors);

  //   return new HttpException(
  //     {
  //       message: constraints
  //         ? Object.values(constraints.constraints)[0]
  //         : 'Something went wrong during validation',
  //       property: constraints ? constraints.property : null,
  //     },
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // },
};

export default validationOptions;
