import type { ValidationError } from '@nestjs/common';

interface VeSubTree {
  _?: string[];
  [key: string]: VeSubTree | string[];
}

export const i18nValidationErrorFormatter = (
  validationErrors: ValidationError[],
): VeSubTree => {
  const res: VeSubTree = {};

  for (const ve of validationErrors) {
    let veResponseSubTree: VeSubTree | string[] = null;

    if (ve.children.length > 0) {
      veResponseSubTree = i18nValidationErrorFormatter(ve.children);
    }

    const propertyErrors = Object.values(ve.constraints || {});

    if (propertyErrors.length > 0) {
      if (!veResponseSubTree) {
        // only property related errors
        veResponseSubTree = propertyErrors;
      } else {
        // add _ as general errors to property's children errors
        (veResponseSubTree as VeSubTree)._ = propertyErrors;
      }
    }

    res[ve.property] = veResponseSubTree;
  }

  return res;
};
