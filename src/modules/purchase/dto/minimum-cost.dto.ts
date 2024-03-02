import { MinimumCostResponseType } from './purchase-ipod.dto';

export class MinimumCostDto {
  minimumCost: number;

  unitsLeftInIndia: number;

  unitsLeftInSrilanka: number;

  constructor(minimumCostResponseType: MinimumCostResponseType) {
    this.minimumCost = minimumCostResponseType.totalCostWithTransport;
    this.unitsLeftInIndia = minimumCostResponseType.unitsLeftInIndia;
    this.unitsLeftInSrilanka = minimumCostResponseType.unitsLeftInSrilanka;
  }
}
