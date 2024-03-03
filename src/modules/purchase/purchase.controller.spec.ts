import { Test } from '@nestjs/testing';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { MinimumCostDto } from './dto/minimum-cost.dto';
import { PurchaseIpodDto } from './dto/purchase-ipod.dto';
import { CountryListEnum } from './enum/country-list.enum';

describe('PurchaseController', () => {
  let controller: PurchaseController;
  let service: PurchaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [PurchaseService],
    }).compile();

    service = moduleRef.get<PurchaseService>(PurchaseService);
    controller = moduleRef.get<PurchaseController>(PurchaseController);
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
        minimumCost: 1500,
        unitsLeftInIndia: 80,
        unitsLeftInSrilanka: 100,
      };
      jest.spyOn(service, 'calculateMinCost').mockResolvedValue(result);
      expect(await controller.calculateMinCost(payload)).toBe(result);
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
        minimumCost: 1500,
        unitsLeftInIndia: 80,
        unitsLeftInSrilanka: 100,
      };
      jest.spyOn(service, 'calculateMinCost').mockResolvedValue(result);
      expect(await controller.calculateMinCost(payload)).toBe(result);
    });
  });
});
