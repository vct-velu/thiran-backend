import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { CountryListEnum } from '../enum/country-list.enum';
import { getEnumValues } from 'src/utils/get-step-indexes';
import { Transform } from 'class-transformer';

export class PurchaseIpodDto {
  @ApiProperty({ example: 30000, type: 'number', minimum: 0 })
  @Min(0, {
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.number_min_value',
    ),
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        'dtos.common.is_not_number',
      ),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.is_empty_object',
    ),
  })
  costInIndia: number;

  @ApiProperty({ example: 25000, type: 'number', minimum: 0 })
  @Min(0, {
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.number_min_value',
    ),
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        'dtos.common.is_not_number',
      ),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.is_empty_object',
    ),
  })
  costInSrilanka: number;

  @ApiProperty({ example: 5000, type: 'number', minimum: 0 })
  @Min(0, {
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.number_min_value',
    ),
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        'dtos.common.is_not_number',
      ),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.is_empty_object',
    ),
  })
  transportCostPer10Blocks: number;

  @ApiProperty({ example: 30, type: 'integer', minimum: 0 })
  @Min(0, {
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.number_min_value',
    ),
  })
  @IsInt({
    message: i18nValidationMessage<I18nTranslations>('dtos.common.is_not_int'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.is_empty_object',
    ),
  })
  unitsOrdered: number;

  @ApiProperty({
    example: 'india',
    enum: CountryListEnum,
    nullable: false,
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.is_not_string',
    ),
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase().trim() : value,
  )
  @IsEnum(CountryListEnum, {
    message: i18nValidationMessage<I18nTranslations>(
      'dtos.common.is_not_enum',
      {
        enumValues: `${getEnumValues(CountryListEnum)}`,
      },
    ),
  })
  orderFrom: CountryListEnum;
}

export type MinimumCostResponseType = {
  totalCostWithTransport: number;
  unitsLeftInIndia: number;
  unitsLeftInSrilanka: number;
};
