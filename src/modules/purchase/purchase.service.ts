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

  calculateMinCost(purchaseIpodDto: PurchaseIpodDto): Promise<MinimumCostDto> {
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

    const response: MinimumCostResponseType = {
      unitsLeftInIndia: 100,
      unitsLeftInSrilanka: 100,
      totalCostWithTransport: 0,
    };
    response.unitsLeftInIndia = 100;
    response.unitsLeftInSrilanka = 100;
    console.log('response :', response);

    if (orderFrom === CountryListEnum.INDIA) {
      response.totalCostWithTransport = totalCostSriLanka + transportCost;
      response.unitsLeftInIndia -= unitsOrdered;
    } else if (orderFrom === CountryListEnum.SRILANKA) {
      response.totalCostWithTransport = totalCostIndia + transportCost;
      response.unitsLeftInSrilanka -= unitsOrdered;
    } else {
      throw new Error('Invalid orderFrom value');
    }
    return Promise.resolve(new MinimumCostDto(response));
  }
}
