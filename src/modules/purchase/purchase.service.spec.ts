import { Test } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { MinimumCostDto } from './dto/minimum-cost.dto';
import { PurchaseIpodDto } from './dto/purchase-ipod.dto';
import { CountryListEnum } from './enum/country-list.enum';

describe('PurchaseService', () => {
  let service: PurchaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PurchaseService],
    }).compile();

    service = moduleRef.get<PurchaseService>(PurchaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateMinCost', () => {
    it('should calculate minimum cost for India', async () => {
      const payload: PurchaseIpodDto = {
        costInIndia: 1000,
        costInSrilanka: 1200,
        transportCostPer10Blocks: 1000,
        unitsOrdered: 20,
        orderFrom: CountryListEnum.INDIA,
      };
      const result: MinimumCostDto = {
        minimumCost: 26000,
        unitsLeftInIndia: 80,
        unitsLeftInSrilanka: 100,
      };
      expect(await service.calculateMinCost(payload)).toEqual(result);
    });
    it('should calculate minimum cost for Srilanks', async () => {
      const payload: PurchaseIpodDto = {
        costInIndia: 1000,
        costInSrilanka: 1200,
        transportCostPer10Blocks: 1000,
        unitsOrdered: 20,
        orderFrom: CountryListEnum.SRILANKA,
      };
      const result: MinimumCostDto = {
        minimumCost: 22000,
        unitsLeftInIndia: 100,
        unitsLeftInSrilanka: 80,
      };
      expect(await service.calculateMinCost(payload)).toEqual(result);
    });
  });
});
