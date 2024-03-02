import { Injectable } from '@nestjs/common';
import {
  PurchaseIpodDto,
  MinimumCostResponseType,
} from './dto/purchase-ipod.dto';
import { CountryListEnum } from './enum/country-list.enum';
import { MinimumCostDto } from './dto/minimum-cost.dto';

@Injectable()
export class PurchaseService {
  constructor() {}

  calculateMinCost(purchaseIpodDto: PurchaseIpodDto): MinimumCostDto {
    const {
      costInIndia,
      costInSrilanka,
      orderFrom,
      transportCostPer10Blocks,
      unitsOrdered,
    } = purchaseIpodDto;

    const totalCostIndia: number = costInIndia * unitsOrdered;
    const totalCostSriLanka: number = costInSrilanka * unitsOrdered;
    const transportBlocks: number =
      unitsOrdered % 10 !== 0
        ? Math.floor(unitsOrdered / 10) + 1
        : Math.floor(unitsOrdered / 10);
    const transportCost: number = transportBlocks * transportCostPer10Blocks;

    let response: MinimumCostResponseType;
    response.unitsLeftInIndia = 100 - unitsOrdered;
    response.unitsLeftInSrilanka = 100 - unitsOrdered;

    if (orderFrom === CountryListEnum.INDIA) {
      response.totalCostWithTransport = totalCostSriLanka + transportCost;
      response.unitsLeftInSrilanka -= unitsOrdered;
      return new MinimumCostDto(response);
    } else if (orderFrom === CountryListEnum.SRILANKA) {
      response.totalCostWithTransport = totalCostIndia + transportCost;
      response.unitsLeftInIndia -= unitsOrdered;
      return new MinimumCostDto(response);
    }
  }
}
