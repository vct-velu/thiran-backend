import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseIpodDto } from './dto/purchase-ipod.dto';
import { CountryListEnum } from './enum/country-list.enum';
import { TranslatableBadRequestException } from 'src/utils/translatable-exceptions';
import { MinimumCostDto } from './dto/minimum-cost.dto';

@ApiTags('Purchase')
@Controller({
  path: 'purchase',
  version: '1',
})
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('/calculate-min-cost')
  @HttpCode(HttpStatus.OK)
  calculateMinCost(
    @Body() purchaseIpodDto: PurchaseIpodDto,
  ): Promise<MinimumCostDto> {
    if (
      purchaseIpodDto.orderFrom !== CountryListEnum.INDIA &&
      purchaseIpodDto.orderFrom !== CountryListEnum.SRILANKA
    ) {
      throw new TranslatableBadRequestException(
        'dtos.exceptions.country_not_found',
      );
    }
    return this.purchaseService.calculateMinCost(purchaseIpodDto);
  }
}
